/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
const db = require('../../Databases');

module.exports = {
  getReviews: async (productId, callback) => {
    const queryString = 'SELECT Reviews.*, ReviewPhotos.Photo_url FROM Reviews INNER JOIN ReviewPhotos ON Reviews.Review_ID = ReviewPhotos.Review_ID WHERE Reviews.Product_ID=(?) ORDER BY Reviews.Helpfulness DESC';
    db.query(queryString, [productId], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  getMetaData: async (productId, callback) => {
    const allMetaData = {
      ProductID: productId,
      Characteristics: {
        Size: {
          Characteristic_ID: null,
          Value: null,
        },
        Fit: {
          Characteristic_ID: null,
          Value: null,
        },
        Quality: {
          Characteristic_ID: null,
          Value: null,
        },
        Comfort: {
          Characteristic_ID: null,
          Value: null,
        },
        Length: {
          Characteristic_ID: null,
          Value: null,
        },
        Width: {
          Characteristic_ID: null,
          Value: null,
        },
      },
      Ratings: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
      Recommended: {
        true: 0,
        false: 0,
      },
    };
    const queryCharacteristics = 'SELECT Characteristic_Reviews.Characteristic_ID, Characteristic_Reviews.Value, Characteristics.Name FROM Characteristic_Reviews INNER JOIN Characteristics ON Characteristic_Reviews.Characteristic_ID = Characteristics.Characteristic_ID WHERE Characteristics.Product_ID = (?)';
    db.query(queryCharacteristics, [productId], (errorChar, charData) => {
      if (errorChar) {
        callback(errorChar);
      } else {
        const queryStars = 'SELECT Rating, Recommend FROM Reviews WHERE Product_ID = (?)';
        db.query(queryStars, [productId], (errStar, revData) => {
          if (errStar) {
            callback(errStar);
          } else {
            for (let k = 0; k < charData.length; k++) {
              allMetaData.Characteristics[charData[k].Name].Characteristic_ID = charData[k].Characteristic_ID;
              if (!allMetaData.Characteristics[charData[k].Name].Value) {
                allMetaData.Characteristics[charData[k].Name].Value = charData[k].Value;
              } else {
                allMetaData.Characteristics[charData[k].Name].Value += charData[k].Value;
              }
              // allMetaData['Characteristics'][charData[k].Name].Value /= (k + 1);
            }
            for (let i = 0; i < revData.length; i++) {
              allMetaData.Ratings[revData[i].Rating]++;
              if (revData[i].Recommend === 'true') {
                allMetaData.Recommended.true++;
              } else {
                allMetaData.Recommended.false++;
              }
            }
            callback(null, allMetaData);
          }
        });
      }
    });
  },

  updateReviewHelpfuless: (reviewId, callback) => {
    const queryString = 'UPDATE Reviews SET Helpfulness = Helpfulness + 1 WHERE Review_ID = (?)';
    db.query(queryString, [reviewId], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  updateReviewReported: (reviewId, callback) => {
    const queryString = 'UPDATE Reviews SET Reported = true WHERE Review_ID = (?)';
    db.query(queryString, [reviewId], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  addReview: (review, callback) => {
    // How to insert photos in here? and should I write meta data?
    const queryString = 'INSERT INTO Reviews (Product_ID, Rating, Review_date, Summary, Review_body, Recommend, Reported, Reviewer_name, Reviewer_email, Review_Response, Helpfulness) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // eslint-disable-next-line max-len
    db.query(queryString, [review.Product_ID, review.Rating, review.Review_date, review.Summary, review.Review_body, review.Recommend, false, review.Reviewer_name, review.Reviewer_email, 'null', 0], (err, result) => {
      if (err) {
        callback(err);
      } else {
        const images = review.photoUrls;
        const id = result.insertId;
        const imageVals = [];
        images.forEach((image) => {
          imageVals.push([id, image]);
        });
        const photoQuery = 'INSERT INTO ReviewPhotos (Review_ID, Photo_url) VALUES ?';
        db.query(photoQuery, [imageVals], (error) => {
          if (error) {
            callback(error);
          } else {
            const chars = review.metaData;
            const metaArray = [];
            for (const key in chars) {
              metaArray.push([key, id, chars[key]]);
            }
            const metaQuery = 'INSERT INTO Characteristic_Reviews (Characteristic_ID, Review_ID, Value) VALUES ?';
            db.query(metaQuery, [metaArray], (errMeta) => {
              if (errMeta) {
                callback(errMeta);
              } else {
                callback(null);
              }
            });
          }
        });
      }
    });
  },

};
