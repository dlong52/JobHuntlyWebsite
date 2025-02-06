const levelService = require('../services/LevelService');

const getAllLevels = async (req, res) => {
    try {
        const levels = await levelService.getAllLevels();
        return res.status(200).json({
            status: "success",
            message: "Get all levels successfully",
            data: levels
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching levels', error });
    }
};

const getLevelById = async (req, res) => {
    try {
        const level = await levelService.getLevelById(req.params.id);
        if (!level) {
            return res.status(404).json({ message: 'Level not found' });
        }
        return res.status(200).json({
            status: "success",
            message: "Get level successfully",
            data: level
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching level', error });
    }
};

const createLevel = async (req, res) => {
    try {
        const newLevel = await levelService.createLevel(req.body);
        return res.status(200).json({
            status: "success",
            message: "Created level successfully",
            data: newLevel
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating level', error });
    }
};

const updateLevel = async (req, res) => {
    try {
        const updatedLevel = await levelService.updateLevel(req.params.id, req.body);
        if (!updatedLevel) {
            return res.status(404).json({ message: 'Level not found' });
        }
        return res.status(200).json({
            status: "success",
            message: "Updated level successfully",
            data: updatedLevel
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating level', error });
    }
};

const deleteLevel = async (req, res) => {
    try {
        const deletedLevel = await levelService.deleteLevel(req.params.id);
        if (!deletedLevel) {
            return res.status(404).json({ message: 'Level not found' });
        }
        return res.status(200).json({
            status: "success",
            message: "Level deleted successfully",
            data: deletedLevel
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting level', error });
    }
};

module.exports = {
    getAllLevels,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel,
};
