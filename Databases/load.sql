LOAD DATA LOCAL INFILE 'Databases/characteristics.csv' INTO TABLE Characteristics FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'Databases/characteristic_reviews.csv' INTO TABLE Characteristic_Reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'Databases/cleanedReviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE 'Databases/reviews_photos.csv' INTO TABLE ReviewPhotos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'Databases/product.csv' INTO TABLE Products FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (@col1,@col2,@col3,@col4, @col5, @col6) set Product_ID=@col1,Product_name=@col2;


LOAD DATA LOCAL INFILE '/Users/anindyamehta/Downloads/characteristics.csv' INTO TABLE Characteristics FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/anindyamehta/Downloads/characteristic_reviews.csv' INTO TABLE Characteristic_Reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/anindyamehta/Documents/cleanedReviews.csv' INTO TABLE Reviews FIELDS TERMINATED By ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Downloads/reviews_photos.csv' INTO TABLE ReviewPhotos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

SELECT Reviews.Review_ID, Reviews.Summary, Reviews.Review_date, Reviews.Helpfulness, ReviewPhotos.Photo_url FROM Reviews INNER JOIN ReviewPhotos ON Reviews.Review_ID = ReviewPhotos.Review_ID WHERE Reviews.Product_ID=11212 ORDER BY Reviews.Helpfulness DESC;

SET GLOBAL LOCAL_INFILE = 1;