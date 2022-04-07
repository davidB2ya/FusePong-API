const Tickets = require('../../db/models/Tickets');

const { success, error } = require('../../middlewares/response');

const ticketsRouter = require('express').Router();

// Get all tickets
ticketsRouter.get('/all-tickets', async (req, res) => {

    try {
        const tickets = await Tickets.find({})
        success(req, res, tickets, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Post create a ticket
ticketsRouter.post('/create-ticket', async (req, res) => {
    try {
        const { nameTickets, description, state, id_user, id_project } = req.body;

        if (!nameTickets || !description || !id_user || !id_project)
            return error(req, res, 'Please fill in all fields.', 400, "")

        const newTicket = new Tickets({
            nameTickets,
            description,
            state,
            id_user,
            id_project
        });

        await newTicket.save();

        success(req, res, 'Ticket has been create!', 200);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//  Put update a ticket
ticketsRouter.put('/update-ticket/:id', async (req, res) => {
    let id = req.params.id
    const { nameTickets, description, state, id_user } = req.body;

    Tickets.updateOne(
        { _id: id },
        {
            $set: {
                nameTickets: nameTickets,
                description: description,
                state: state,
                id_user: id_user,
            }
        },
    )
        .then(function () {
            success(req, res, 'Ticket updated successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Delete a ticket
ticketsRouter.delete('/delete-ticket/:id', async (req, res) => {
    let id = req.params.id

    Tickets.deleteOne(
        { _id: id }
    )
        .then(function () {
            success(req, res, 'Ticket removed successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Get search a ticket
ticketsRouter.get('/one/:id', async (req, res) => {
    let id = req.params.id
    const getOneTicket = await Tickets.findById({ _id: id })
    success(req, res, getOneTicket, 200)

})

// Get all tickets the a project
ticketsRouter.get('/all-tickets/:id', async (req, res) => {

    try {
        const tickets = await Tickets.find({id_project: id})
        success(req, res, tickets, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    ticketsRouter
}