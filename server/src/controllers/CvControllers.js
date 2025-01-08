const cvService = require('../services/CvServices');

const createCV = async (req, res) => {
    try {
      const cv = await cvService.createCV(req.body);
      return res.status(201).json(cv);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const getCVById = async (req, res) => {
    try {
      const cv = await cvService.getCVById(req.params.id);
      if (!cv) {
        return res.status(404).json({ message: 'CV not found' });
      }
      return res.status(200).json(cv);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const getAllCVs = async (req, res) => {
    try {
      const cvs = await cvService.getAllCVs(req.query);
      return res.status(200).json(cvs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const updateCV = async (req, res) => {
    try {
      const cv = await cvService.updateCV(req.params.id, req.body);
      if (!cv) {
        return res.status(404).json({ message: 'CV not found' });
      }
      return res.status(200).json(cv);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const deleteCV = async (req, res) => {
    try {
      const cv = await cvService.deleteCV(req.params.id);
      if (!cv) {
        return res.status(404).json({ message: 'CV not found' });
      }
      return res.status(200).json({ message: 'CV deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

module.exports = {
    createCV,
    updateCV,
    deleteCV,
    getAllCVs,
    getCVById
};
