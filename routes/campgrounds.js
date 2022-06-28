const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { isLoggedin, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary")
const upload = multer({ storage });

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedin, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground))


router.get("/new", isLoggedin, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampgroud))
    .put(isLoggedin, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedin, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedin, isAuthor, catchAsync(campgrounds.renderEditForm));



module.exports = router;