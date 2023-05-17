import mongoose from 'mongoose';

// look for url connection string
const connectDB = (url) => {
    mongoose.connect(url).then(data => console.log(5656))
    return mongoose.connect(url)
}

export default connectDB;