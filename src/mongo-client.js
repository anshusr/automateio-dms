const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('./config');
let dbPromise;

module.exports.getMongoClient = async () => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise(async (res, rej) => {
    try {
      client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
      res(client);
    } catch (e) {
      rej(e);
    }
  });
  return dbPromise;
}
