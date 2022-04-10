const User = require('../../db/models/User');
const bcrypt = require('bcrypt');

const { success, error } = require('../../middlewares/response');
const { validateEmail } = require('../../middlewares/regularExpressions')

const usersRouter = require('express').Router();

// Get all users
usersRouter.get('/all-users', async (req, res) => {

    try {
        const users = await User.find({})
        success(req, res, users, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Post create a user
usersRouter.post('/create-user', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        if (!name || !email || !password || !role)
            return error(req, res, 'Please fill in all fields.', 400, { name, email, password })

        if (!validateEmail(email))
            return error(req, res, 'Invalid emails.', 400, email)

        const user = await User.findOne({ email });

        if (user)
            return error(req, res, 'This email already exists.', 400, email)

        if (password.length < 6)
            return error(req, res, 'Password must be at least 6 characters.', 400, password)

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            passwordHash,
            role
        });

        await newUser.save();

        success(req, res, 'User has been create!', 200);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//  Put update a user
usersRouter.put('/update-user/:id', async (req, res) => {
    let id = req.params.id
    const { name, email, password, phoneNumber,avatar, id_company } = req.body

    User.updateOne(
        { _id: id },
        {
            $set: {
                name: name,
                email: email,
                password: password,
                phoneNumber : phoneNumber,
                avatar : avatar, 
                id_company : id_company
            }
        },
    )
        .then(function () {
            success(req, res, 'User updated successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Delete a user
usersRouter.delete('/delete-user/:id', async (req, res) => {
    let id = req.params.id

    User.deleteOne(
        { _id: id }
    )
        .then(function () {
            success(req, res, 'User removed successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Get search a user
usersRouter.get('/one/:id', async (req, res) => {
    let id = req.params.id
    const getOneUser = await User.findById({ _id: id })
    success(req, res, getOneUser, 200)

})

module.exports = {
    usersRouter
}