const WishList = require('../models/WishList');

// Add job to wishlist
const addJobToWishList = async (userId, jobId) => {
  try {
    const wishList = await WishList.findOneAndUpdate(
      { user: userId },
      { $addToSet: { jobs: jobId } }, // Ensure no duplicates
      { new: true, upsert: true } // Create if not exist
    ).populate('jobs', 'title company');
    return wishList;
  } catch (error) {
    throw new Error('Failed to add job to wishlist');
  }
};

// Remove job from wishlist
const removeJobFromWishList = async (userId, jobId) => {
  try {
    const wishList = await WishList.findOneAndUpdate(
      { user: userId },
      { $pull: { jobs: jobId } }, // Remove job from array
      { new: true }
    ).populate('jobs', 'title company');
    return wishList;
  } catch (error) {
    throw new Error('Failed to remove job from wishlist');
  }
};

// Get wishlist by user
const getWishListByUser = async (userId) => {
  try {
    const wishList = await WishList.findOne({ user: userId })
      .populate('jobs', 'title company location')
      .populate('user', 'name email');
    return wishList;
  } catch (error) {
    throw new Error('Failed to retrieve wishlist');
  }
};

module.exports = {
  addJobToWishList,
  removeJobFromWishList,
  getWishListByUser,
};
