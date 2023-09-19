const express = require('express');
const ROUTER = express.Router();

const UserController = require('../controllers/user');

ROUTER.get('/', UserController.GET_Home);
// ROUTER.get('/shop', UserController.GET_Shop);
// ROUTER.get('/card', UserController.GET_Card);
// ROUTER.get('/orders', UserController.GET_Orders);
ROUTER.get('/product-details', UserController.GET_Product_Details);
// ROUTER.post('/add-to-order', UserController.POST_Add_To_Order);

// ROUTER.post('/add-to-card/:productId', UserController.POST_Add_To_Card);
// ROUTER.post('/delete-from-card/:productId', UserController.POST_Delete_From_Card);

module.exports = ROUTER;
