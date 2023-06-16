import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "please provide company"],
            maxlength: 50,
        },
        position: {
            type: String,
            required: [true, "please provide position"],
            maxlength: 100,
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending',
        },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'remote', 'internship'],
            default: 'full-time',
        },
        jobLocation: {
            type: String,
            default: 'Portland, OR',
            required: [true]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    },
    {timestamps: true}
);


// to create the jobs collection in mongodb, note model has a type and schema for it
export default mongoose.model('Job', JobSchema)