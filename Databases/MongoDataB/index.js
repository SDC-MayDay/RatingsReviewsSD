const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/productReviews', {useNewUrlParser: true, useFindAndModify: false });

const { Schema } = mongoose;

let Reviews = Schema({
  reviews: [{
    review_id: Number,
    product_id: Number,
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    date: Date,
    reviewer_username: String,
    helpfulness: Number,
    photos: [{
      url: String,
    }],
})

let ProductReviewsRatingsSchema = Schema({
  product_id: Number,
  meta: {
    ratings: {
      stars5: Number,
      stars4: Number,
      stars3: Number,
      stars2: Number,
      stars1: Number,
    },
    recommend: {
      yes: Number,
      no: Number,
    },
    characteristics: {
      size: [Number],
      width: [Number],
      quality: [Number],
      comfort: [Number],
      fit: [Number],
      length: [Number],
    }

  }
})