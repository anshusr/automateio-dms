const { getMongoClient } = require('../mongo-client');
const { ObjectId } = require('mongodb');

async function getFile(_id, userId) {
  const client = await getMongoClient();
  const collection = client.db('dms').collection('files');
  return collection.findOne({ _id: ObjectId(_id), userId: ObjectId(userId) });
}

async function getFilesInFolder(userId, path) {
  const client = await getMongoClient();
  const collection = client.db('dms').collection('files');
  return (await collection.find({ path, userId: ObjectId(userId) }, { name: 1, isFolder: 1 })).sort({ isFolder: -1 }).toArray();
}

async function add(name, isFolder, userId, path, content) {
  const client = await getMongoClient();
  const collection = client.db('dms').collection('files');
  const doc = await collection.findOne({ name, userId: ObjectId(userId), path });
  if (doc) {
    throw new Error('Filename already exists');
  }
  return collection.insertOne({ name, path, isFolder, userId: ObjectId(userId), content });
}

module.exports = { add, getFile, getFilesInFolder };
