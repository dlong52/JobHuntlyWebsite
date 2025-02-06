const wishListService = require('../services/WhistListServices');

// Add job to wishlist
const addToWishList = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const wishList = await wishListService.addJobToWishList(userId, jobId);
    res.status(200).json({
      status: 'success',
      message: 'Job added to wishlist',
      data: wishList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove job from wishlist
const removeFromWishList = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const wishList = await wishListService.removeJobFromWishList(userId, jobId);
    res.status(200).json({
      status: 'success',
      message: 'Job removed from wishlist',
      data: wishList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get wishlist by user
const getWishListByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishList = await wishListService.getWishListByUser(userId);
    res.status(200).json({
      status: 'success',
      message: 'Wishlist retrieved successfully',
      data: wishList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWishList,
  removeFromWishList,
  getWishListByUser,
};
