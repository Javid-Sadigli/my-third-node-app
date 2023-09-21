const ConsoleController = require('./console');

const Product = require("../models/product");

module.exports.GET_Add_Product = (req, res, next) => {
    res.render('admin/add-product', {PageTitle : 'Add Product'});
};

module.exports.POST_Add_Product = (req, res, next) => {
    const product = new Product(req.body.title, req.body.description, req.body.image_link, req.body.price, req.user._id);
    product.save(() => {
        console.log('Product saved successfully');
        res.redirect('/admin/products');
    });
};

module.exports.GET_Products = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {PageTitle : 'Products', products: products});
    });
};
module.exports.POST_Delete_Product = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId, () => {
        res.redirect('/admin/products');
    });
};
module.exports.GET_Edit_Product = (req, res, next) => {
    const productId = req.query.id;
    Product.fetchById(productId, (product) => {
        res.render('admin/edit-product', {PageTitle : 'Edit Product', product: product});
    });
};
module.exports.POST_Edit_Product = (req, res, next) => {
    Product.editById(
        req.body.id,
        req.body.title, 
        req.body.description,
        req.body.image_link,
        req.body.price,
        () => {
            res.redirect('/admin/products');
        }
    );
};