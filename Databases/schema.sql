/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be
 *    mysql -u root < schema.sql
*/

DROP DATABASE IF EXISTS RatingsReviews;

CREATE DATABASE RatingsReviews;

USE RatingsReviews;

DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
  Product_ID INT NOT NULL AUTO_INCREMENT,
  Product_name TEXT NOT NULL,
  PRIMARY KEY (Product_ID)
);

DROP TABLE IF EXISTS Reviews;

CREATE TABLE Reviews (
  Review_ID INT NOT NULL AUTO_INCREMENT,
  Product_ID INT NOT NULL,
  Rating SMALLINT NOT NULL,
  Review_date TEXT NOT NULL,
  Summary VARCHAR(1000) NOT NULL,
  Review_body TEXT NOT NULL,
  Recommend VARCHAR(20) NOT NULL,
  Reported VARCHAR(20) NOT NULL,
  Reviewer_name VARCHAR(250) NOT NULL,
  Reviewer_email VARCHAR(250) NOT NULL,
  Review_Response TEXT NOT NULL,
  Helpfulness INT NOT NULL,
  PRIMARY KEY (Review_ID)
);

DROP TABLE IF EXISTS ReviewPhotos;

CREATE TABLE ReviewPhotos (
  id INT NOT NULL AUTO_INCREMENT,
  Review_ID INT NOT NULL,
  Photo_url TEXT NOT NULL,
  FOREIGN KEY (Review_ID) REFERENCES Reviews(Review_ID),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Characteristics;

CREATE TABLE Characteristics (
  Characteristic_ID INT NOT NULL AUTO_INCREMENT,
  Product_ID INT NOT NULL,
  Name VARCHAR(250) NOT NULL,
  PRIMARY KEY (Characteristic_ID)
);

DROP TABLE IF EXISTS Characteristic_Reviews;

CREATE TABLE Characteristic_Reviews (
  id INT NOT NULL AUTO_INCREMENT,
  Characteristic_ID INT NOT NULL,
  Review_ID INT NOT NULL,
  Value SMALLINT NOT NULL,
  FOREIGN KEY (Characteristic_ID) REFERENCES Characteristics(Characteristic_ID),
  FOREIGN KEY (Review_ID) REFERENCES Reviews(Review_ID),
  PRIMARY KEY (id)
);

