"use strict";

require('dotenv').config();
const db     = require('../lib/db'),
      tweets = require("./tweets");

db.connect((db) => {
  console.log('Clearing all tweets (truncating collection) ...');

  db.collection("tweets").remove({}, false, (err, results) => {
    if (err) throw err;

    console.log(`Inserting ${tweets.length} tweets ...`);

    db.collection("tweets").insertMany(tweets, (err, results) => {
      if (err) throw err;

      db.collection("tweets").count({}, (err, results) => {
        if (err) throw err;

        console.log('tweets in collection "tweets": ', results);

        console.log('Disconnecting from mongodb!');
        db.close();
      });

    });
  });
});
