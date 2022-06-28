const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const Campground = require("./models/campground");
const Review = require("./models/review");


module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be Signed in");
        return res.redirect("/login");
    }
    next();
}
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.isAuthor = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/campgrounds/${req.params.id}`)
    }
    next();
}

module.exports.validateReivew = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(error.details, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}
