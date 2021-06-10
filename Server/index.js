const express = require('express');
const controllers = require('./Controllers');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/reviews/:productId', (req, res) => {
  controllers.getReviewsWithPhotos(req, res);
});

app.get('/metaData/:productId', (req, res) => {
  controllers.getMetaData(req, res);
});

app.post('/reviews', (req, res) => {
  controllers.addReview(req, res);
});

app.patch('/reviews/:reviewId', (req, res) => {
  controllers.updateHelpfulness(req, res);
});

app.patch('/reportReview/:reviewId', (req, res) => {
  controllers.updateReported(req, res);
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = app;
