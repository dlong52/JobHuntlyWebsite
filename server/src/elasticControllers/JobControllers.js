const { Client } = require('@elastic/elasticsearch');
const mongoose = require('mongoose');

class JobSearchController {
  constructor(elasticClient) {
    this.client = elasticClient;
    this.index = 'jobs';
    this.defaultPageSize = 10;
    this.maxSuggestions = 20;
  }

  async createJobIndex() {
    try {
      const indexExists = await this.client.indices.exists({ index: this.index });

      if (indexExists) {
        console.log(`ℹ️ Index ${this.index} already exists`);
        return;
      }

      await this.client.indices.create({
        index: this.index,
        body: {
          settings: {
            analysis: {
              analyzer: {
                custom_analyzer: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'stop']
                }
              }
            }
          },
          mappings: {
            properties: {
              title: { type: 'text', analyzer: 'custom_analyzer' },
              company: {
                properties: {
                  id: { type: 'keyword' },
                  name: { type: 'text', analyzer: 'custom_analyzer' }
                }
              },
              description: { type: 'text', analyzer: 'custom_analyzer' },
              requirements: { type: 'text', analyzer: 'custom_analyzer' },
              job_benefit: { type: 'text', analyzer: 'custom_analyzer' },
              category_names: { type: 'keyword' },
              level_name: { type: 'keyword' },
              salary: {
                properties: {
                  min: { type: 'integer' },
                  max: { type: 'integer' }
                }
              },
              location: {
                properties: {
                  additional_info: { type: 'text', analyzer: 'custom_analyzer' },
                  province: {
                    properties: {
                      id: { type: 'keyword' },
                      name: { type: 'text', analyzer: 'custom_analyzer' }
                    }
                  },
                  district: {
                    properties: {
                      id: { type: 'keyword' },
                      name: { type: 'text', analyzer: 'custom_analyzer' }
                    }
                  },
                  ward: {
                    properties: {
                      id: { type: 'keyword' },
                      name: { type: 'text', analyzer: 'custom_analyzer' }
                    }
                  }
                }
              },
              created_at: { type: 'date' },
              updated_at: { type: 'date' }
            }
          }
        }
      });

      console.log(`✅ Created index ${this.index} successfully`);
    } catch (error) {
      console.error('❌ Error creating job index:', error);
      throw new Error(`Failed to create index: ${error.message}`);
    }
  }

  async searchJobs(req, res) {
    try {
      const {
        keyword = '',
        category_names,
        level_name,
        min_salary,
        max_salary,
        company_name,
        location,
        page = 1,
        limit = this.defaultPageSize
      } = this.parseQueryParams(req.query);

      const query = this.buildSearchQuery({
        keyword,
        category_names,
        level_name,
        min_salary,
        max_salary,
        company_name,
        location
      });

      const searchResult = await this.client.search({
        index: this.index,
        body: {
          query,
          sort: [{ created_at: 'desc' }, '_score'],
          from: (page - 1) * limit,
          size: limit,
          track_total_hits: true,
          highlight: {
            pre_tags: ['<mark>'],
            post_tags: ['</mark>'],
            fields: {
              title: {},
              description: {},
              requirements: {},
              'company.name': {},
              'location.province.name': {},
              'location.district.name': {},
              'location.ward.name': {},
              'location.additional_info': {}
            }
          }
        }
      });

      const response = this.formatSearchResponse(searchResult, page, limit);
      return res.json(response);
    } catch (error) {
      this.handleError(res, 'Error searching jobs', error);
    }
  }

  async suggestJobs(req, res) {
    try {
      const { keyword = '' } = req.query;

      if (!keyword.trim()) {
        return res.json({ suggestions: [], original_results: [] });
      }

      const result = await this.client.search({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: keyword.toLowerCase(),
              fields: [
                'title',
                'category_names',
                'company.name',
                'location.province.name',
                'location.district.name',
                'location.ward.name'
              ],
              type: 'phrase_prefix',
              max_expansions: 50
            }
          },
          _source: [
            'title',
            'category_names',
            'level_name',
            'company.name',
            'location.province.name',
            'location.district.name',
            'location.ward.name'
          ],
          size: this.maxSuggestions,
          collapse: { field: 'title.keyword' }
        }
      });

      const jobs = result.hits.hits.map(hit => hit._source);
      const suggestions = this.generateAISuggestions(keyword, jobs);

      return res.json({
        suggestions: suggestions.slice(0, 10),
        original_results: jobs.map(job => 
          `${job.title} - ${job.company.name} - ${job.location?.province?.name || ''}`
        )
      });
    } catch (error) {
      this.handleError(res, 'Error suggesting jobs', error);
    }
  }

  // Helper methods
  parseQueryParams(query) {
    return {
      keyword: query.keyword || '',
      category_names: query.category_names ? [].concat(query.category_names) : undefined,
      level_name: query.level_name,
      min_salary: query.min_salary ? parseInt(query.min_salary) : undefined,
      max_salary: query.max_salary ? parseInt(query.max_salary) : undefined,
      company_name: query.company_name,
      location: query.location, // Thêm tham số location
      page: parseInt(query.page) || 1,
      limit: parseInt(query.limit) || this.defaultPageSize
    };
  }

  buildSearchQuery(params) {
    const query = { bool: { must: [], filter: [] } };

    if (params.keyword) {
      query.bool.must.push({
        multi_match: {
          query: params.keyword,
          fields: [
            'title^2',
            'description',
            'requirements',
            'job_benefit',
            'company.name^1.5',
            'location.province.name^1.5',
            'location.district.name^1.5',
            'location.ward.name^1.5',
            'location.additional_info'
          ],
          type: 'best_fields',
          fuzziness: 'AUTO',
          prefix_length: 2
        }
      });
    }

    if (params.category_names?.length) {
      query.bool.filter.push({ terms: { category_names: params.category_names } });
    }
    if (params.level_name) {
      query.bool.filter.push({ term: { level_name: params.level_name } });
    }
    if (params.company_name) {
      query.bool.filter.push({ term: { 'company.name': params.company_name } });
    }
    if (params.min_salary || params.max_salary) {
      query.bool.filter.push({
        range: { 'salary.min': { gte: params.min_salary, lte: params.max_salary } }
      });
    }
    if (params.location) {
      query.bool.filter.push({
        bool: {
          should: [
            { term: { 'location.province.name': params.location } },
            { term: { 'location.district.name': params.location } },
            { term: { 'location.ward.name': params.location } },
            { match: { 'location.additional_info': params.location } }
          ],
          minimum_should_match: 1
        }
      });
    }

    return query;
  }

  formatSearchResponse(result, page, limit) {
    const total = result.hits.total.value;
    return {
      total,
      page: Number(page),
      limit: Number(limit),
      total_pages: Math.ceil(total / limit),
      jobs: result.hits.hits.map(hit => ({
        id: hit._id,
        ...hit._source,
        score: hit._score,
        highlights: hit.highlight || {}
      }))
    };
  }

  generateAISuggestions(keyword, jobs) {
    const baseSuggestions = jobs.map(job => 
      `${job.title} at ${job.company.name} in ${job.location?.province?.name || ''}`
    );
    const categorySuggestions = Array.from(new Set(jobs.flatMap(job => job.category_names || [])))
      .map(category => `${keyword} in ${category}`);
    const companySuggestions = Array.from(new Set(jobs.map(job => job.company.name)))
      .map(company => `${keyword} at ${company}`);
    const locationSuggestions = Array.from(
      new Set(jobs.map(job => job.location?.province?.name).filter(Boolean))
    ).map(location => `${keyword} in ${location}`);

    return [...new Set([...baseSuggestions, ...categorySuggestions, ...companySuggestions, ...locationSuggestions])];
  }

  handleError(res, message, error) {
    console.error(`${message}:`, error);
    res.status(500).json({
      message,
      error: error.message
    });
  }
}

module.exports = JobSearchController;