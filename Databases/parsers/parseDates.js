const fs = require('fs');
const csv = require('csv-parser');
const csvWriter = require('csv-write-stream');

const writer = csvWriter({
  separator: ',',
  newline: '\n',
  headers: ['id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommend', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness'],
  sendHeaders: true,
});

writer.pipe(fs.createWriteStream('/Users/anindyamehta/Documents/HR_Immersive/RatingsReviewsSD/Databases/cleanedReviews.csv'));

fs.createReadStream('/Users/anindyamehta/Documents/HR_Immersive/RatingsReviewsSD/Databases/reviews.csv')
  .pipe(csv())
  .on('data', (data) => {
    const parsedEpoch = parseInt(data.date);
    if (parsedEpoch) {
      const newDate = new Date(parsedEpoch);
      data.date = newDate.toString();
    } else {
      const tempDate = new Date(data.date);
      const epochDate = tempDate.getTime();
      const newParsedDate = new Date(epochDate);
      data.date = newParsedDate.toString();
    }
    if (data.helpfulness === 'null') {
      data.helpfulness = 0;
    }
    writer.write(data);
  })
  .on('end', () => {
    console.log('Done');
  });
