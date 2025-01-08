const Job = require('../models/Job');

const createJob = async (jobData) => {
    const job = new Job(jobData);
    return await job.save();
};

const getAllJobs = async (filters = {}) => {
    return await Job.find(filters).populate('posted_by').populate('applications').populate('categories');
};

const getJobById = async (id) => {
    return await Job.findById(id).populate('posted_by').populate('applications').populate('categories');
};

const updateJob = async (id, jobData) => {
    jobData.updated_at = Date.now();
    return await Job.findByIdAndUpdate(id, jobData, { new: true });
};

const deleteJob = async (id) => {
    return await Job.findByIdAndDelete(id);
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};
