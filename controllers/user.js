const Product = require("../models/product");

module.exports.GET_Home = (req,res,next) => {
    Product.fetchAll((products) => {
        res.render('user/home', {PageTitle : 'Home', products: products});
    });
};
module.exports.GET_Shop = (req,res,next) => {
    res.render('user/shop', {PageTitle : 'Shop'});
};
module.exports.GET_Card = (req,res,next) => {
    req.user.getCard((card) => {
        res.render('user/card', {PageTitle : 'Card', products : card.products, totalPrice : card.totalPrice});
    });
};
module.exports.GET_Orders = (req,res,next) => {
    req.user.getOrders((orders) => {
        res.render('user/orders', {PageTitle : 'Orders', orders : orders}); 
    });
};
module.exports.GET_Product_Details = (req,res,next) => {
    const productId = req.query.id;
    Product.fetchById(productId, (product) => {
        res.render('user/product-details', {PageTitle : 'Details', product: product});
    });
};
module.exports.POST_Add_To_Card = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchById(productId, (product) => {
        req.user.addToCard(product, () => {
            res.redirect('/card');
        });
    });
};
module.exports.POST_Delete_From_Card = (req, res, next) => {
    const productId = req.params.productId;
    req.user.deleteFromCard(productId, () => {
        res.redirect('/card');
    });
};
module.exports.POST_Add_To_Order = (req, res, next) => {
    req.user.addToOrders(() => {
        res.redirect('/orders');
    })
};

 