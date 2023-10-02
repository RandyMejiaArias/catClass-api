import mongoose from 'mongoose';
import config from '../config.js';

const connectDB = async () => {
	console.log('connecting MongoDB');
	mongoose.set('strictQuery', false);
	await mongoose.connect(
		config.MONGODB_URI
	);
	console.log('DB is Connected');
}

connectDB();