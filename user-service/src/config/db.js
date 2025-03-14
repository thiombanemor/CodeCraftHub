const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

/**
 * Connects to MongoDB using the URI from the environment variables.
 * Automatically exits the process if the connection fails (except in test mode).
 */
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1); // Prevents the app from running with a broken DB connection
        }
    }
};

module.exports = connectDB;
