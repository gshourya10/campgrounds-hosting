const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapper");
const { validateLogin, validateReview } = require("../utils/middleware");
const review = require("../controllers/reviews");

router.get("/", review.index);

router.post("/", validateReview, validateLogin, wrapAsync(review.createNew));

router.delete("/:reviewId", validateLogin, wrapAsync(review.destroy));

module.exports = router;
