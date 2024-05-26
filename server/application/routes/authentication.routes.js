/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const authenticationRoute = require('express').Router();
const AuthenticationController = require('../controllers/authentication.controllers');

authenticationRoute.put('/register', (req, res) => AuthenticationController.registration(req, res));

module.exports = authenticationRoute;
