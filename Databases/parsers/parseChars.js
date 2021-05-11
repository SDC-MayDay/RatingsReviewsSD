const fs = require('fs');
const csv = require('csv-parser');
const fast = require('fast-csv');
const db = require('../index.js');
const csvWriter = require('csv-write-stream');

const parseName = (name) => name.substring(1, name.length - 1);
let counter = 0;
const csvStream = fast.parseFile('characteristics.csv',
  { headers: true }).transform((record) => ({
  ...record,
}))
  .on('data', (record) => {
    const q = 'INSERT INTO CharData SET ?';
    db.query(q, record, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      counter++;
      if (counter % 1000 === 0) {
        console.log(`At ${counter}`);
      }
    });
  });
