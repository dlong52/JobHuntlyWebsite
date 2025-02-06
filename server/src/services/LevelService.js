const Level = require("../models/Level");

const getAllLevels = async () => {
    return await Level.find({});
};

const getLevelById = async (id) => {
    return await Level.findById(id);
};

const createLevel = async (data) => {
    const level = new Level(data);
    return await level.save();
};

const updateLevel = async (id, data) => {
    return await Level.findByIdAndUpdate(id, data, { new: true });
};

const deleteLevel = async (id) => {
    return await Level.findByIdAndDelete(id);
};

module.exports = {
    getAllLevels,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel,
};
