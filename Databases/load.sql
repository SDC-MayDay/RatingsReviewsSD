LOAD DATA LOCAL INFILE 'Databases/characteristics.csv' INTO TABLE Characteristics FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'Databases/characteristic_reviews.csv' INTO TABLE Characteristic_Reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'Databases/cleanedReviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE 'Databases/reviews_photos.csv' INTO TABLE ReviewPhotos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'Databases/product.csv' INTO TABLE Products FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (@col1,@col2,@col3,@col4, @col5, @col6) set Product_ID=@col1,Product_name=@col2;


SET GLOBAL LOCAL_INFILE = 1;