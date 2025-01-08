const Application = require('../models/Application');

const createApplication = async (data) => {
    const application = new Application(data);
    return await application.save();
  }

const getApplicationById = async (applicationId) => {
    return await Application.findById(applicationId)
      .populate('candidate')
      .populate('job')
      .populate('CV');
  }

const getAllApplications = async (query = {}) => {
    return await Application.find(query)
      .populate('candidate')
      .populate('job')
      .populate('CV');
  }

const updateApplication = async (applicationId, data) => {
    return await Application.findByIdAndUpdate(applicationId, data, {
      new: true,
    });
  }

const deleteApplication = async (applicationId) => {
    return await Application.findByIdAndDelete(applicationId);
  }

module.exports = {
    createApplication,
    updateApplication,
    deleteApplication,
    getAllApplications,
    getAllApplications
};
