const Company = require('../../db/models/Company');

const { success, error } = require('../../middlewares/response');
const { validateEmail } = require('../../middlewares/regularExpressions')

const companyRouter = require('express').Router();

// Get all companys
companyRouter.get('/all-companys', async (req, res) => {

    try {
        const companys = await Company.find({})
        success(req, res, companys, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Post create a company
companyRouter.post('/create-company', async (req, res) => {
    try {
        const { nameCompany, email, logoCompany, phoneNumber, nit, adress } = req.body;

        if (!nameCompany || !email || !nit || !adress || !phoneNumber)
            return error(req, res, 'Please fill in all fields.', 400, "")

        if (!validateEmail(email))
            return error(req, res, 'Invalid emails.', 400, email)

        const company = await Company.findOne({ nit });

        if (company)
            return error(req, res, 'There is already a company with this nit.', 400, "Ya existe una compañía con este NIT")

        if (nit.length < 10)
            return error(req, res, 'NIT must be at least 6 characters.', 400, "El NIT debe tener al menos 10 caracteres.")

        if (phoneNumber.length < 10)
            return error(req, res, 'Phone must be at least 10 characters.', 400, "El teléfono debe tener al menos 10 caracteres.");

        const newCompany = new Company({
            nameCompany,
            email,
            logoCompany,
            phoneNumber,
            nit,
            adress
        });

        await newCompany.save();

        success(req, res, 'Company has been create!', 200);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//  Put update a company
companyRouter.put('/update-company/:id', async (req, res) => {
    let id = req.params.id
    const { nameCompany, email, logoCompany, phoneNumber, nit, adress } = req.body

    Company.updateOne(
        { _id: id },
        {
            $set: {
                nameCompany: nameCompany,
                email: email,
                logoCompany: logoCompany,
                phoneNumber: phoneNumber,
                nit: nit,
                adress: adress,
            }
        },
    )
        .then(function () {
            success(req, res, 'Company updated successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Delete a Company
companyRouter.delete('/delete-company/:id', async (req, res) => {
    let id = req.params.id

    Company.deleteOne(
        { _id: id }
    )
        .then(function () {
            success(req, res, 'Company removed successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Get search a Company
companyRouter.get('/one/:id', async (req, res) => {
    let id = req.params.id
    const getOneCompany = await Company.findById({ _id: id })
    success(req, res, getOneCompany, 200)

})

module.exports = {
    companyRouter
}