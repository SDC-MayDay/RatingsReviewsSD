const fs = require('fs');
const csv = require('csv-parser')
var csvWriter = require('csv-write-stream')

const writer = csvWriter({
  separator: ',',
  newline: '\n',
  headers: ['id','product_id','rating','date','summary','body','recommend','reported','reviewer_name','reviewer_email','response','helpfulness'],
  sendHeaders: true
})

writer.pipe(fs.createWriteStream('/Users/anindyamehta/Documents/HR_Immersive/RatingsReviewsSD/Databases/cleanedReviews.csv'));

fs.createReadStream('/Users/anindyamehta/Documents/HR_Immersive/RatingsReviewsSD/Databases/reviews.csv')
  .pipe(csv())
  .on('data', (data) => {
    let parsedEpoch = parseInt(data.date)
    if (parsedEpoch) {
      let newDate = new Date(parsedEpoch)
      data['date'] = newDate.toString();
    } else {
      let tempDate = new Date(data['date'])
      let epochDate = tempDate.getTime();
      let newParsedDate = new Date(epochDate);
      data['date'] = newParsedDate.toString();
    }
    if (data['helpfulness'] === 'null' ) {
      data['helpfulness'] = 0;
    }
    writer.write(data);

  })
  .on('end', () => {
    console.log('Done')
  })
