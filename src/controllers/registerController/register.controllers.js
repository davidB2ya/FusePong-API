const User = require('../../db/models/User');
const bcrypt = require('bcrypt');

const { success, error } = require('../../middlewares/response');
const { validateEmail } = require('../../middlewares/regularExpressions');

//Register Users

const registerRouter = require('express').Router();

registerRouter.post('/', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, id_company } = req.body;

        if (!name || !email || !password || !phoneNumber || !id_company) {
            return error(req, res, 'Please fill in all fields.', 400, "Complete todos los campos");
        };

        if (!validateEmail(email)) {
            return error(req, res, 'Invalid emails.', 400, "Correo incorrecto");
        };

        const user = await User.findOne({ email });

        if (user) {
            return error(req, res, 'This email already exists.', 400, "Correo no valido");
        };

        if (password.length < 6) {
            return error(req, res, 'Password must be at least 6 characters.', 400, "La contraseña debe tener al menos 10 caracteres.");
        };

        if (phoneNumber.length < 10){
            return error(req, res, 'Phone must be at least 10 characters.', 400, "El teléfono debe tener al menos 10 caracteres.");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            passwordHash,
            phoneNumber,
            id_company
        });

        await newUser.save();

        success(req, res, 'User has been create!', 200);

    } catch (err) {
        error(req, res, 'Server error', 500, err.message)
    }
});

module.exports = {
    registerRouter
};