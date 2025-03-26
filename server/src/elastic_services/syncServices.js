const { default: mongoose } = require("mongoose");
const { connect } = require("../configs/database");
const { createElasticsearchClient } = require("../configs/elasticsearch");
const Job = require("../models/Job");

class SyncService {
  constructor() {
    this.mongoClient = null;
    this.elasticClient = null;
  }

  async initialize() {
    try {
      // Kết nối MongoDB
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URL, {
          serverSelectionTimeoutMS: 15000,
          socketTimeoutMS: 45000
        });
        console.log("✅ Kết nối MongoDB thành công");
      }

      // Khởi tạo Elasticsearch client
      this.elasticClient = createElasticsearchClient();
      console.log("✅ Khởi tạo Elasticsearch client thành công");
    } catch (error) {
      console.error("❌ Lỗi khởi tạo kết nối:", error);
      throw error;
    }
  }

  async createJobIndex() {
    try {
      const indexName = "jobs";
      const indexExists = await this.elasticClient.indices.exists({
        index: indexName
      });

      if (!indexExists) {
        await this.elasticClient.indices.create({
          index: indexName,
          body: {
            mappings: {
              properties: {
                title: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256
                    }
                  }
                },
                company: {
                  type: "object",
                  properties: {
                    id: { type: "keyword" },
                    name: { 
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    }
                  }
                },
                description: { type: "text" },
                requirements: { type: "text" },
                job_benefit: { type: "text" },
                category_names: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256
                    }
                  }
                },
                level_name: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256
                    }
                  }
                },
                salary: {
                  type: "object",
                  properties: {
                    min: { type: "integer" },
                    max: { type: "integer" }
                  }
                },
                created_at: { type: "date" },
                updated_at: { type: "date" }
              }
            }
          }
        });
        console.log(`✅ Đã tạo index ${indexName} thành công`);
      } else {
        console.log(`ℹ️ Index ${indexName} đã tồn tại`);
      }
    } catch (error) {
      console.error("❌ Lỗi tạo job index:", error);
      throw error;
    }
  }

  async syncJobsToElasticsearch(indexName = "jobs", batchSize = 100) {
    try {
      // Khởi tạo kết nối nếu chưa có
      if (!this.elasticClient) {
        await this.initialize();
      }

      // Tạo index nếu chưa tồn tại
      await this.createJobIndex();

      // Đếm tổng số jobs
      const totalJobCount = await Job.countDocuments({});
      console.log(`📊 Tổng số jobs: ${totalJobCount}`);

      if (totalJobCount === 0) {
        console.log("❌ Không có job nào để đồng bộ");
        return 0;
      }

      // Truy vấn jobs với populate
      const jobs = await Job.find({})
      .populate({
        path: "categories",
        select: "name"
      })
      .populate({
        path: "level",
        select: "name"
      })
      .populate({
        path: "company",
        select: "id name"
      })
      .populate({
        path: "subscription_id",
        select: "name package_id",
        populate: {
          path: "package_id",
          select: "name package_code"
        }
      })
      .lean();

    // Chuẩn bị bulk operations
    const bulkOperations = jobs.flatMap(job => {
      const transformedJob = {
        ...job,
        category_names: job.categories ? job.categories.map(cat => cat.name) : [],
        level_name: job.level?.name || null,
        subscription_name: job.subscription_id?.name || null,
        package_name: job.subscription_id?.package_id?.name || null,
        package_code: job.subscription_id?.package_id?.package_code || null,
        company: job.company ? {
          id: job.company._id || job.company.id,
          name: job.company.name
        } : null
      };

      return [
        {
          index: {
            _index: indexName,
            _id: transformedJob._id.toString()
          }
        },
        {
          ...transformedJob,
          _id: undefined,
          categories: undefined,
          level: undefined,
          subscription_id: undefined
        }
      ];
    });

      console.log(`📤 Số lượng bulk operations: ${bulkOperations.length}`);

      // Thực hiện bulk index
      if (bulkOperations.length > 0) {
        const bulkResponse = await this.elasticClient.bulk({ 
          body: bulkOperations,
          refresh: true 
        });

        // Kiểm tra và log lỗi chi tiết
        if (bulkResponse.errors) {
          const erroredDocuments = bulkResponse.items
            .filter(item => item.index && item.index.error)
            .map(item => ({
              id: item.index._id,
              error: item.index.error
            }));
          
          console.error('❌ Các document bị lỗi:', erroredDocuments);
        }

        console.log(`✅ Đã đồng bộ tổng cộng ${jobs.length} jobs`);
        return jobs.length;
      }

      return 0;

    } catch (error) {
      console.error("❌ Chi tiết lỗi sync jobs:", error);
      throw error;
    }
  }
}

module.exports = new SyncService();