/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const categoryRoute = require('express').Router();
const CategoryController = require('../controllers/category.controllers');

categoryRoute.post('/create-category', (req, res) => CategoryController.createCategory(req, res));
categoryRoute.get('/get-categories', (req, res) => CategoryController.getCategories(req, res));
categoryRoute.get('/get/:categoryId', (req, res) => CategoryController.getCategory(req, res));
categoryRoute.get('/members/:categoryId', (req, res) => CategoryController.getCategoryMembers(req, res));
categoryRoute.put('/update', (req, res) => CategoryController.updateCategory(req, res));
categoryRoute.put('/update-description', (req, res) => CategoryController.updateCategoryDescription(req, res));
categoryRoute.put('/join-leave-category', (req, res) => CategoryController.follow_UnfollowCategory(req, res));
categoryRoute.post('/delete', (req, res) => CategoryController.deleteCategory(req, res));
categoryRoute.get('/search', (req, res) => CategoryController.getSearchedCategories(req, res));

module.exports = categoryRoute;
