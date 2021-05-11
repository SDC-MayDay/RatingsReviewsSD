const models = require('../Models');

module.exports = {
  getReviewsWithPhotos: (req, res) => {
    const { productId } = req.query;
    models.getReviews(productId, (err, reviews) => {
      if (err) {
        res.status(400).send('Error in grabbing the reviews', err);
      } else {
        res.status(200).send(reviews);
      }
    });
  },

  getMetaData: (req, res) => {
    const { productId } = req.params;
    models.getMetaData(productId, (err, metaData) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(metaData);
      }
    });
  },

  updateHelpfulness: (req, res) => {
    const { reviewId } = req.params;
    models.updateReviewHelpfuless(reviewId, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204);
        res.send('Updated Helfpulness');
      }
    });
  },

  updateReported: (req, res) => {
    const { reviewId } = req.query;
    models.updateReviewReported(reviewId, (err) => {
      if (err) {
        res.status(400);
        res.send('Error in updating the reported feature', err);
      } else {
        res.status(204);
        res.send('Set review to reported. This review will not be displayed');
      }
    });
  },

  addReview: (req, res) => {
    const review = req.body;
    models.addReview(review, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201);
        res.send('Added your review!');
      }
    });
  },

};
