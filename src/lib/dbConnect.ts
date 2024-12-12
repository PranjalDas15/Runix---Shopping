import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected.")
        return
    }

    try {
        const db = await mongoose.connect('mongodb+srv://pranjal080015:SJEEhbl6lR4XRNpH@runix.ve2nz.mongodb.net/?retryWrites=true&w=majority&appName=Runix');

        connection.isConnected = db.connections[0].readyState
        console.log("Database connected.")
    } catch (error) {
        console.log("Database connection failed.", error );
        process.exit(1);
    }
}

export default dbConnect;