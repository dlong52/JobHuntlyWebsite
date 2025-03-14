const WishList = require("../models/WishList");

const isJobInWishList = async (userId, jobId) => {
  try {
    const wishList = await WishList.findOne({ user: userId });

    if (wishList && wishList.jobs.includes(jobId)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }
};
const addJobToWishList = async (userId, jobId) => {
  try {
    const wishList = await WishList.findOneAndUpdate(
      { user: userId },
      { $addToSet: { jobs: jobId } },
      { new: true, upsert: true }
    ).populate("jobs", "title company");
    return wishList;
  } catch (error) {
    throw new Error("Failed to add job to wishlist");
  }
};

const removeJobFromWishList = async (userId, jobId) => {
  try {
    const wishList = await WishList.findOneAndUpdate(
      { user: userId },
      { $pull: { jobs: jobId } },
      { new: true }
    ).populate("jobs", "title company");
    return wishList;
  } catch (error) {
    throw new Error("Failed to remove job from wishlist");
  }
};

const getWishListByUser = async (userId) => {
  try {
    const wishList = await WishList.findOne({ user: userId })
      .populate({
        path: "jobs",
        select: "title location employment_type end_date",
        populate: {
          path: "company",
          select: "name logo",
        },
      })
      .populate("user", "name email");

    return wishList;
  } catch (error) {
    throw new Error("Failed to retrieve wishlist");
  }
};

module.exports = {
  addJobToWishList,
  removeJobFromWishList,
  getWishListByUser,
  isJobInWishList,
};
