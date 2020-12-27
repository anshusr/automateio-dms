module.exports = async function(client) {
  await client.db('dms').collection('files').createIndex({ path: 'hashed', isFolder:'-1' });
  await client.db('dms').collection('user').createIndex({ username: 'hashed' });
}