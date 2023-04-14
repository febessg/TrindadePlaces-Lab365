const Router = require('express');

const createUser = require('../controllers/users/createUser');
const createSession = require('../controllers/sessions/createSession');
const validateNewUser = require('../middlewares/validateNewUser');

const usersRoutes = new Router();

usersRoutes.post('/users', validateNewUser, createUser);
usersRoutes.post('/sessions', createSession);

module.exports = usersRoutes;