const MongoClient = require('mongodb');
const config = require('../config');

const {
  dbUser, dbPassword, dbHost, dbName,
} = config;

const mongoUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db(dbName);
  } catch (error) {
    console.error('Could not connect to db', error);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
