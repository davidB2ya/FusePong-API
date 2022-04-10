const Projects = require('../../db/models/Projects');
const Tickets = require('../../db/models/Tickets');

const { success } = require('../../middlewares/response');

const dashboardRouter = require('express').Router();

// 
dashboardRouter.get('/tacks/:id', async (req, res) => {
    
    let id = req.params.id
    let tacks = []

    try {
        const projects = await Projects.find({id_company: id})
        
        for (let index = 0; index < projects.length; index++) {
            const element = projects[index].id;
            const tickets = await Tickets.find({id_project: element})
            tacks.push(
                {   
                    id : index,
                    project: {
                        id: projects[index]._id,
                        name : projects[index].nameProjects,
                        logo :  projects[index].logoProjects,
                        state : projects[index].state,
                        user : projects[index].id_user
                    },
                    ticket: tickets
                }
            )
        }
        
        success(req, res, tacks, 200);


    }catch(err) {
        console.error(err)
    }
})



module.exports = {
    dashboardRouter
}