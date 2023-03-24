import mongoose from 'mongoose';

// look for url connection string
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB;