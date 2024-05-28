/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const userRoute = require('express').Router();
const UserController = require('../controllers/user.controllers');

userRoute.get('/get-users', (req, res) => UserController.getUsers(req, res));
userRoute.get('/get/:userId', (req, res) => UserController.getUser(req, res));
userRoute.put('/update', (req, res) => UserController.updateUser(req, res));
userRoute.delete('/delete/:userId', (req, res) => UserController.deleteUser(req, res));

module.exports = userRoute;
