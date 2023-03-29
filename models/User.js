import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        minlength: 6,
        // to avoid sharing password
        select: false,
    },
    lastName: {
        type: String,
        // required: [true, "please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
        default: "last name"
    },
    location: {
        type: String,
        // required: [true, "please provide name"],
        minlength: 3,
        maxlength: 20,
        default: "my city"

    }
});

//triggered in 2 instances in auth controller when user is created and also the update user, note use function keyword here per mongoose, you may need to invoke next() parameter if code is getting stuck here
UserSchema.pre('save', async function () {
    // running the jashing of password
    // console.log(this.password)
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    // this is the document
    console.log(57, this)
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })

}

// to create the users collection in mongodb, note model has a type and schema for it
export default mongoose.model('User', UserSchema)