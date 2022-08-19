const Campground = require("../models/campgrounds");
const {
  campgroundSchema,
  reviewSchema,
} = require("../schemas/campgroundSchema");
const AppError = require("../utils/AppError");

const validateLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in.");
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  }
  next();
};

const validateData = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

const validateCampground = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find the campground");
    return res.redirect("/campgrounds");
  }
  next();
};

const validateAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

module.exports = {
  validateLogin,
  validateData,
  validateCampground,
  validateAuthor,
  validateReview,
};
