"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {

  connect: (onConnect) => {

    let dbInstance;

    console.log(`Connecting to mongodb @ ${MONGODB_URI}`);

    MongoClient.connect(MONGODB_URI, (err, db) => {
      if (err) throw err;
      console.log("Successfully connected to DB: " + MONGODB_URI);
      // call callback with db connection instance
      dbInstance = db;
      onConnect(dbInstance);
    });

    function gracefulShutdown() {
      console.log("Shutting down gracefully...");
      try {
        dbInstance.close();
      } catch (e) {
        console.log("Failed to disconnect from Mongo...");
        throw e;
      } finally {
        console.log("Bye for now");
        process.exit();
      }
    }

    process.on("SIGTERM", gracefulShutdown); // listen for TERM signal .e.g. kill
    process.on("SIGINT", gracefulShutdown);  // listen for INT signal e.g. Ctrl-C
  }

}
