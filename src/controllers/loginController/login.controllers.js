const bcrypt = require('bcrypt');
const User = require('../../db/models/User');

//Login

const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const isMatch = user === null ? false : await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid password or user'
            })
        }

        res.send({
            user: user,
            msg: 'Login success!'
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})


module.exports = {
    loginRouter
};