const { Router } = require('express');
const router = Router();

// Import Controllers
const UsersControl = require('../controllers/userController/user.controllers');
const RegisterControl = require('../controllers/registerController/register.controllers');
const LoginControl = require('../controllers/loginController/login.controllers');
const CompanyControl = require('../controllers/companyController/company.controllers');
const ProjectsControl = require('../controllers/projectsController/projects.controllers');
const TicketsControl = require('../controllers/ticketsController/tickets.controllers');
const DashBoardControl = require('../controllers/dashboardController/dashboard.controllers');

// Routes
router.use('/api/users', UsersControl.usersRouter);
router.use('/api/register', RegisterControl.registerRouter);
router.use('/api/login', LoginControl.loginRouter);
router.use('/api/company', CompanyControl.companyRouter);
router.use('/api/projects', ProjectsControl.projectsRouter);
router.use('/api/tickets', TicketsControl.ticketsRouter);
router.use('/api/dashboard', DashBoardControl.dashboardRouter);

module.exports = router;