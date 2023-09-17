const getDb = require("../data/database").getDb;


class Product
{   
    constructor(name, description, image_link, price)
    {
        this.name = name;
        this.description = description;
        this.image_link = image_link;
        this.price = price;
    }
    save()
    {
        const db = getDb();
        db.collection('products').insertOne(this);
    }
}

module.exports = Product;