const { getMongoClient } = require('../mongo-client');

async function get(username, password) {
    const client = await getMongoClient();
    const collection = client.db('dms').collection('user');
    return collection.findOne({ username, password });
}

async function add(username, password) {
    const client = await getMongoClient();
    const collection = client.db('dms').collection('user');
    const doc = await collection.findOne({ username });
    if (doc) {
        return false;
    }
    return collection.insertOne({ username, password });
}

module.exports = { add, get };
