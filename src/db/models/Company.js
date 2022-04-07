const { Schema, model } = require('mongoose');

// Schema creation for company
const companySchema = new Schema(
    {
        nameCompany: {
            type: String,
            required: [true, 'Please enter the name of Company!'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter the email!'],
            trim: true,
            unique: true,
        },
        logoCompany: {
            type: String,
            default: 'https://i.ibb.co/3WhbW1f/Company-1.png',
        },
        phoneNumber: {
            type: Number,
        },
        nit: {
            type: Number,
            unique: true,
            required: [true]
        },
        adress: {
            type: String,
            required : [true, 'Please enter the adress']
        }
    },
    {
        timestamps: true,
    },
);

// Fixes in companySchema
companySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

// Compilation of company model
const Company = model('Company', companySchema);

module.exports = Company;