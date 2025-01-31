import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected.");
    return;
  }
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("Mongo uri not defined.");
    } else {
      const db = await mongoose.connect(MONGO_URI);

      connection.isConnected = db.connections[0].readyState;
      console.log("Database connected.");
    }
  } catch (error) {
    console.log("Database connection failed.", error);
    process.exit(1);
  }
}

export default dbConnect;
