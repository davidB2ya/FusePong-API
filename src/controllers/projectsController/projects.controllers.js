const Projects = require('../../db/models/Projects');

const { success, error } = require('../../middlewares/response');

const projectsRouter = require('express').Router();

// Get all Projects
projectsRouter.get('/all-projects', async (req, res) => {

    try {
        const projects = await Projects.find({})
        success(req, res, projects, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Post create a project
projectsRouter.post('/create-project', async (req, res) => {
    try {
        const { nameProjects, logoProjects, state, id_user, id_company} = req.body;

        if (!nameProjects || !id_user || !id_company )
            return error(req, res, 'Please fill in all fields.', 400, "")

        const project = await Projects.findOne({ nameProjects });

        if (project)
            return error(req, res, 'There is already a project with this name.', 400, "Ya existe un proyecto con ese nombre")


        const newProject = new Projects({
            nameProjects,
            logoProjects,
            state,
            id_user,
            id_company
        });

        await newProject.save();

        success(req, res, 'Project has been create!', 200);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//  Put update a project
projectsRouter.put('/update-project/:id', async (req, res) => {
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

// Delete a project
projectsRouter.delete('/delete-project/:id', async (req, res) => {
    let id = req.params.id

    Projects.deleteOne(
        { _id: id }
    )
        .then(function () {
            success(req, res, 'Project removed successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Get search a project
projectsRouter.get('/one/:id', async (req, res) => {
    let id = req.params.id
    const getOneProject = await Projects.findById({ _id: id })
    success(req, res, getOneProject, 200)

})

// Get total projects for company
projectsRouter.get('/all-projects/:id', async (req, res) => {
    let id = req.params.id
    try {
        const projects = await Projects.find({id_company: id})
        success(req, res, projects, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Get total active projects for company 
projectsRouter.get('/all-projects/active/:id', async (req, res) => {
    let id = req.params.id
    try {
        const projects = await Projects.find({id_company: id, state: true})
        success(req, res, projects, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Get total await projects for company 
projectsRouter.get('/all-projects/await/:id', async (req, res) => {
    let id = req.params.id
    try {
        const projects = await Projects.find({id_company: id, state: false})
        success(req, res, projects, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})


module.exports = {
    projectsRouter
}