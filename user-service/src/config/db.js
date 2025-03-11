const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Charge les variables d’environnement

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
            process.exit(1); // ✅ Évite que Jest plante en cas d'erreur
        }
    }
};

module.exports = connectDB;
