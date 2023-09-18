const getDb = require("../data/database").getDb;


class Product
{   
    constructor(title, description, image_link, price)
    {
        this.title = title;
        this.description = description;
        this.image_link = image_link;
        this.price = price;
    }
    save()
    {
        const db = getDb();
        return db.collection('products').insertOne(this).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    static fetchAll()
    {
        const db = getDb();
        return db.collection('products').find().toArray().then((products) => {
            return products;
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Product;