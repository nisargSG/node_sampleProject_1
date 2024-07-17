const req = require('express/lib/request');
const { MongoClient } = require('mongodb');
const logger = require('./logger')


//Connection Object
const client = new MongoClient(process.env.MONGO_SERVER);

//Create Connection Function
async function connectDB() {
    try{
        await client.connect();
        logger(`Connected With Database Server...`,"success")
    }
    catch(e){
        logger(`Failed To Connect Database Server ${e}`,"error")
    }
}

//Create Connection Function
function getMongoClient() {
    return client;
  }

module.exports={connectDB,getMongoClient}