const getDb = require("../data/database").getDb;
const mongodb = require("mongodb");

class Product
{   
    constructor(title, description, image_link, price, userId)
    {
        this.title = title;
        this.description = description;
        this.image_link = image_link;
        this.price = price;
        this.userId = userId;
    }
    save(CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection('products').insertOne(this).then(() => {
            CALLBACK_FUNCTION();
        }).catch((error) => {
            console.log(error);
        });
    }

    static fetchAll(CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection('products').find().toArray().then((products) => {
            CALLBACK_FUNCTION(products);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    static fetchById(id, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const _id = new mongodb.ObjectId(id);
        db.collection('products').find({_id : _id}).next().then((product) => {
            CALLBACK_FUNCTION(product);
        }).catch((err) => {
            console.log(err);
        });
    }
    static editById(id, newTitle, newDescription, newImageLink, newPrice, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const _id = new mongodb.ObjectId(id);
        db.collection('products').updateOne({
            _id : _id
        }, {
            $set : {
                title : newTitle,
                description : newDescription,
                image_link : newImageLink,
                price : newPrice
            }
        }).then(() => {
            CALLBACK_FUNCTION();
        });
    }
    static deleteById(id, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const _id = new mongodb.ObjectId(id);
        db.collection('products').deleteOne({
            _id: _id
        }).then(() => {
            CALLBACK_FUNCTION();
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Product;