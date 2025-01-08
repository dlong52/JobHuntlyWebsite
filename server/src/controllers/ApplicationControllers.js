const applicationService = require('../services/ApplicationServices');

const createApplication = async (req, res) => {
    try {
      const application = await applicationService.createApplication(req.body);
      return res.status(201).json(application);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const getApplicationById = async (req, res) => {
    try {
      const application = await applicationService.getApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json(application);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const getAllApplications = async (req, res) => {
    try {
      const applications = await applicationService.getAllApplications(req.query);
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const updateApplication = async (req, res) => {
    try {
      const application = await applicationService.updateApplication(req.params.id, req.body);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json(application);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

const deleteApplication = async (req, res) => {
    try {
      const application = await applicationService.deleteApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

module.exports = {
    createApplication,
    updateApplication,
    deleteApplication,
    getAllApplications, 
    getApplicationById
};
