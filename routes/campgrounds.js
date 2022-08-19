const express = require("express");
const router = express.Router();
const { storage } = require("../cloudinary/config");
const multer = require("multer");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapper");
const {
  validateLogin,
  validateData,
  validateCampground,
  validateAuthor,
} = require("../utils/middleware");
const campground = require("../controllers/campgrounds");

router.get("/", wrapAsync(campground.index));

router.get("/new", validateLogin, campground.newForm);

router.post(
  "/",
  validateLogin,
  upload.array("images"),
  validateData,
  wrapAsync(campground.createNew)
);

router.get("/:id", validateCampground, wrapAsync(campground.show));

router.get(
  "/:id/edit",
  validateLogin,
  validateCampground,
  validateAuthor,
  wrapAsync(campground.editForm)
);

router.put(
  "/:id",
  validateLogin,
  validateCampground,
  upload.array("images"),
  validateData,
  validateAuthor,
  wrapAsync(campground.update)
);

router.delete(
  "/:id",
  validateLogin,
  validateCampground,
  validateAuthor,
  wrapAsync(campground.destroy)
);

module.exports = router;
