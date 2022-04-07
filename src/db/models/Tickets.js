const { Schema, model } = require('mongoose');

// required models
const User = require('../models/User')
const Projects = require('../models/Projects')


// Schema creation for Tickets
const ticketsSchema = new Schema(
    {
        nameTickets: {
            type: String,
            required: [true, 'Please enter the name the Tickets!'],
            trim: true,
        },
        description : {
            type: String
        },
        state : {
            type : Number, // 1 is Created , 2 is On process and 3 is Finish
            default : 1
        },
        id_user: { 
            type: Schema.ObjectId,
            ref: User
        },
        id_project: { 
            type: Schema.ObjectId,
            ref: Projects
        }
    },
    {
        timestamps: true,
    },
);

// Fixes in ticketsSchema
ticketsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

// Compilation of Tickets model
const Tickets = model('Tickets', ticketsSchema);

module.exports = Tickets;