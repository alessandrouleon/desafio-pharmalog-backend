import mongoose from 'mongoose';

import * as dotenv from "dotenv";

dotenv.config();

export const MongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

