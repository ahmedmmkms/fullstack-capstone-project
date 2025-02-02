// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Successfully connected to MongoDB');
        
        // Connect to the 'giftdb' database and store the instance
        dbInstance = client.db(dbName);
        return dbInstance;
    
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        await client.close();
        throw error;
      }
}

module.exports = connectToDatabase;
