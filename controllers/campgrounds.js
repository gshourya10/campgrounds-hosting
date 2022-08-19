const Campground = require("../models/campgrounds");

const index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

const newForm = (req, res) => {
  res.render("campgrounds/new");
};

const createNew = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.images = req.files.map((f) => ({
    path: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  req.flash("success", "Created a campground successfully");
  res.redirect(`/campgrounds/${campground._id}`);
};

const show = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("campgrounds/show", { campground });
};

const editForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
};

const update = async (req, res) => {
  const { id } = req.params;
  const newImgs = req.files.map((f) => ({
    path: f.path,
    filename: f.filename,
  }));
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  campground.images.push(...newImgs);
  campground.save();
  req.flash("success", "Updated the campground successfully");
  res.redirect(`/campgrounds/${id}`);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndRemove(id);
  req.flash("success", "Deleted a campground successfully");
  res.redirect("/campgrounds");
};

module.exports = {
  index,
  newForm,
  createNew,
  show,
  editForm,
  update,
  destroy,
};
