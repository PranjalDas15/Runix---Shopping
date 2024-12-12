import mongoose from 'mongoose';
import UserModel from '../models/User';  // Adjust the path as needed

// Database URI (ensure you have this in your .env.local)
const mongoUri = process.env.MONGO_URI || '';

async function testConnection() {
    try {
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoUri);

        console.log("Successfully connected to the database!");

        // Try to find a user to verify if everything works
        const user = await UserModel.findOne();  // Adjust query if necessary
        if (user) {
            console.log("Found a user: ", user);
        } else {
            console.log("No users found in the database.");
        }
    } catch (error) {
        console.error("Database connection failed:", error);
    } finally {
        // Disconnect from the database after testing
        mongoose.disconnect();
    }
}

testConnection();
