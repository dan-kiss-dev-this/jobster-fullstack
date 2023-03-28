import mongoose from 'mongoose';
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, "please provide name"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        // this is not a validator technically using mongoose index
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6
    },
    lastName: {
        type: String,
        required: [true, "please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
        default: "last name"
    },
    location: {
        type: String,
        required: [true, "please provide name"],
        minlength: 3,
        maxlength: 20,
        default: "my city"

    }
});

// to create the users collection in mongodb, note model has a type and schema for it
export default mongoose.model('User', UserSchema)