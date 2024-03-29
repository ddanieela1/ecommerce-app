import mongoose from 'mongoose';
import dotenv from 'dotenv';

require('dotenv').config();

const connection = {};

async function connect() {
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  });
  console.log('connected to mongo');

  connection.isConnected = db.connections[0].readyState;
  console.log('MongoDB URI:', process.env.MONGODB_URI);
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connection && mongoose.connection.readyState > 0) {
    connection.isConnected = mongoose.connection.readyState;
    if (connection.isConnected === 1) {
      console.log('use prev connection');
      return;
    }
    await mongoose.disconnect();
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
module.exports = db;
// export default db;
