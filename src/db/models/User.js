const { Schema, model } = require('mongoose');

// required models
const Company = require('../models/Company')

// Schema creation for users
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name!'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email!'],
            trim: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: [true, 'Please enter your password!'],
        },
        avatar: {
            type: String,
            default: 'https://i.ibb.co/wydDGF8/avatardefault-92824.png',
        },
        phoneNumber: {
            type: Number,
        },
        id_company: { 
            type: Schema.ObjectId,
            ref: Company
        },
        role: {
            type: Number,
            default: 1,  // default is 1 for user and 2 for admins
        }
    },
    {
        timestamps: true,
    },
);

// Fixes in userSchema
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
});

// Compilation of user model
const User = model('User', userSchema);

module.exports = User;