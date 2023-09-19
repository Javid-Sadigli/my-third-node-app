const express = require('express');
const ROUTER = express.Router();

const AdminController = require('../controllers/admin');

ROUTER.get('/add-product', AdminController.GET_Add_Product);
ROUTER.get('/products', AdminController.GET_Products);
ROUTER.get('/edit-product', AdminController.GET_Edit_Product);

ROUTER.post('/add-product', AdminController.POST_Add_Product);
ROUTER.post('/delete-product', AdminController.POST_Delete_Product);
ROUTER.post('/edit-product', AdminController.POST_Edit_Product);

module.exports = ROUTER;
