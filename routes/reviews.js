const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");
const { isLoggedin, validateReivew, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedin, validateReivew, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedin, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;