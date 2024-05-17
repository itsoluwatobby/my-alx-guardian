/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const userRoute = require('express').Router();
const User = require('../controllers/user.controllers');

userRoute.put('/update-user', (req, res) => User.updateUser(req, res));

module.exports = userRoute;
