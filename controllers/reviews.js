const Campground = require("../models/campgrounds");
const Review = require("../models/review");

const index = (req, res) => {
  res.redirect(`/campgrounds/${req.params.id}`);
};

const createNew = async (req, res) => {
  const { id } = req.params;
  const review = new Review(req.body.review);
  review.author = req.user._id;
  await review.save();
  const campground = await Campground.findById(id);
  campground.reviews.push(review);
  await campground.save();
  req.flash("success", "Created a new review");
  res.redirect(`/campgrounds/${campground._id}`);
};

const destroy = async (req, res) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Deleted a review");
  res.redirect(`/campgrounds/${id}`);
};

module.exports = {
  index,
  createNew,
  destroy,
};
