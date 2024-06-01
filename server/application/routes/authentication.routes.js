/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const authenticationRoute = require('express').Router();
const AuthenticationController = require('../controllers/authentication.controllers');

authenticationRoute.post('/register', (req, res) => AuthenticationController.registration(req, res));
authenticationRoute.post('/thirdParty', (req, res) => AuthenticationController.thirdPartySignIn(req, res));
authenticationRoute.post('/accountActivation', (req, res) => AuthenticationController.accountActivation(req, res));
authenticationRoute.post('/signin', (req, res) => AuthenticationController.login(req, res));
authenticationRoute.post('/signout', (req, res) => AuthenticationController.logout(req, res));
authenticationRoute.post('/forgotPassword', (req, res) => AuthenticationController.forgotPassword(req, res));
authenticationRoute.put('/passwordReset', (req, res) => AuthenticationController.passwordReset(req, res));
authenticationRoute.post('/resendOTP', (req, res) => AuthenticationController.resendOTP(req, res));
authenticationRoute.put('/verifyOTP', (req, res) => AuthenticationController.verifyOTP(req, res));

module.exports = authenticationRoute;
