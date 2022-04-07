const { Schema, model } = require('mongoose');

// required models
const User = require('../models/User')
const Company = require('../models/Company')

// Schema creation for projects
const projectsSchema = new Schema(
    {
        nameProjects: {
            type: String,
            required: [true, 'Please enter the name of Projects!'],
            trim: true,
        },
        logoProjects: {
            type: String,
            default: 'https://i.ibb.co/3WhbW1f/Company-1.png',
        },
        state : {
            type : Boolean, // true is active and false is on hold
            default : true
        },
        id_user: { 
            type: Schema.ObjectId,
            ref: User
        },
        id_company: { 
            type: Schema.ObjectId,
            ref: Company
        }
    },
    {
        timestamps: true,
    },
);

// Fixes in projectsSchema
projectsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

// Compilation of Projects model
const Projects = model('Projects', projectsSchema);

module.exports = Projects;