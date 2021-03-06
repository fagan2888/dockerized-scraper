const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
let db = require('./config/db');

const app = express();

const port = 8081;

app.use(bodyParser.urlencoded({ extended: true }));

console.log(db.url);

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  db = database.db('HonoluluProperty');
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log(`live on ${port}`);
  });
});
