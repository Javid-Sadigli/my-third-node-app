const Product = require("../models/product");

module.exports.GET_Home = (req,res,next) => {
    Product.fetchAll().then((products) => {
        res.render('user/home', {PageTitle : 'Home', products: products});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.GET_Shop = (req,res,next) => {
    res.render('user/shop', {PageTitle : 'Shop'});
};
module.exports.GET_Card = (req,res,next) => {
    let totalPrice;
    req.user.getCard().then((card) => {
        totalPrice = card.totalPrice;
        return card.getProducts();
    }).then((products) => {
        res.render('user/card', {PageTitle : 'Card', products : products, totalPrice : totalPrice});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.GET_Orders = (req,res,next) => {
    req.user.getOrders({include : ['products']}).then((orders) => {
        res.render('user/orders', {PageTitle : 'Orders', orders : orders}); 
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.GET_Product_Details = (req,res,next) => {
    const productId = req.query.id;
    Product.findByPk(productId).then((product) => {
        res.render('user/product-details', {PageTitle : 'Details', product: product});
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Add_To_Card = (req, res, next) => {
    const productId = req.params.productId;
    let MyCard;
    let newAmount = 1;
    let product_price;
    req.user.getCard().then((card) => {
        MyCard = card;
        return card.getProducts({where : {id: productId}});
    }).then((products) => {
        const product = products[0];
        if(product)
        {
            newAmount = product.cardItem.amount + 1;
        }
        return Product.findByPk(productId);
    }).then((product) => {
        product_price = product.price;
        return MyCard.addProduct(product, {through : {
            amount : newAmount
        }});
    }).then(() => {
        MyCard.totalPrice = (MyCard.totalPrice + product_price).toFixed(2);
        MyCard.save();
    }).then(() => {
        res.redirect('/card');
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Delete_From_Card = (req, res, next) => {
    const productId = req.params.productId;
    let product_price;
    let MyCard;
    req.user.getCard().then((card) => {
        MyCard = card;
        return card.getProducts({where : {
            id : productId
        }});
    }).then((products) => {
        const product = products[0];
        product_price = product.price * product.cardItem.amount;
        return product.cardItem.destroy();
    }).then(() => {
        MyCard.totalPrice = (MyCard.totalPrice - product_price).toFixed(2);
        return MyCard.save();
    }).then(() => {
        res.redirect('/card');
    }).catch((err) => {
        console.log(err);
    });
};
module.exports.POST_Add_To_Order = (req, res, next) => {
    let the_products;
    let MyCard;
    req.user.getCard().then((card) => {
        MyCard = card;
        return card.getProducts();
    }).then((products) => {
        the_products = products;
        return req.user.createOrder({totalPrice : MyCard.totalPrice});
    }).then((order) => {
        return order.addProducts(the_products.map((product) => {
            product.orderItem = {amount : product.cardItem.amount};
            return product;
        }));
    }).then(() => {
        return MyCard.setProducts([]);
    }).then(() => {
        MyCard.totalPrice = 0;
        return MyCard.save();
    }).then(() => {
        res.redirect('/orders');
    }).catch((err) => {
        console.log(err);
    });
};

 