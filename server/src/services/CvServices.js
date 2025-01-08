const CV = require('../models/CV');

const createCV = async (data) => {
    const cv = new CV(data);
    return await cv.save();
  }

const getCVById = async (cvId) => {
    return await CV.findById(cvId).populate('candidate_id');
  }

const getAllCVs = async (query = {}) => {
    return await CV.find(query).populate('candidate_id');
  }

const updateCV = async (cvId, data) => {
    return await CV.findByIdAndUpdate(cvId, data, { new: true });
  }

const deleteCV = async (cvId) => {
    return await CV.findByIdAndDelete(cvId);
  }

module.exports = {
    createCV,
    updateCV,
    deleteCV,
    getAllCVs,
    getCVById
};
