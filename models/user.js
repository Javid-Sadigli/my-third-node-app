const getDb = require('../data/database').getDb;
const mongodb = require('mongodb');
class User
{
    constructor(username, email, password, id)
    {
        if(id)
        {
            this._id = new mongodb.ObjectId(id);
        }
        this.username = username;
        this.email = email;
        this.password = password;
    }
    save(CALLBACK_FUNCTION)
    {   
        if(!this._id)
        {
            this.card = {
                totalPrice : 0,
                products : []
            };
            const db = getDb();
            db.collection('users').insertOne(this).then(() => {
                CALLBACK_FUNCTION();
            }).catch((err) => {
                console.log(err);
            });
        }
        else
        {
            console.log("You cannot save user with your id. The id will be created by mongodb. ");
        }
    }
    static fetchById(id, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const _id = new mongodb.ObjectId(id);
        db.collection('users').find({_id: _id}).next().then((user) => {
            CALLBACK_FUNCTION(user);
        }).catch((err) => {
            console.log(err);
        });
    }
    addToCard(product, CALLBACK_FUNCTION)
    {
        const db = getDb();
        let updatedCard;
        let existing_product_index;
        db.collection('users').find({_id: this._id}).next().then((user) => {
            updatedCard = user.card;
            existing_product_index = updatedCard.products.findIndex(prod => prod._id.toString() == product._id.toString());
            if(existing_product_index >= 0)
            {
                updatedCard.products[existing_product_index].amount += 1;
            }
            else
            {
                product.amount = 1;
                updatedCard.products.push(product);
            }
            updatedCard.totalPrice = (parseFloat(updatedCard.totalPrice) + parseFloat(product.price)).toFixed(2);
            return db.collection('users').updateOne({_id : user._id}, {
                $set : {
                    card : updatedCard
                }
            });

        }).then(() => {
            CALLBACK_FUNCTION();
        }).catch((err) => {
            console.log(err);
        });
    }
    getCard(CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection('users').find({_id: this._id}).next().then((user) => {
            CALLBACK_FUNCTION(user.card);
        }).catch((err) => {
            console.log(err);
        });
    }
    deleteFromCard(productId, CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection('users').find({_id : this._id}).next().then((user) => {
            let updatedCard = user.card;
            const deletingProduct = updatedCard.products.filter((prod) => prod._id.toString() == productId)[0];
            updatedCard.totalPrice = (parseFloat(updatedCard.totalPrice) - parseFloat(deletingProduct.price) * parseFloat(deletingProduct.amount)).toFixed(2);
            updatedCard.products = updatedCard.products.filter((prod) => prod._id.toString() != productId);
            return db.collection('users').updateOne({_id : user._id}, {
                $set : {
                    card : updatedCard
                }
            });
        }).then(() => {
            CALLBACK_FUNCTION();
        }).catch((err) => {
            console.log(err);
        });
    }
    addToOrders(CALLBACK_FUNCTION)
    {
        let newOrder;
        const db = getDb();
        db.collection('users').find({_id : this._id}).next().then((user) => {
            const card = user.card;
            newOrder = {
                products : card.products,
                totalPrice : card.totalPrice,
                user : {
                    _id : this._id,
                    username : this.username, 
                    email : this.email
                }
            };
            const updatedCard = {
                products : [],
                totalPrice : 0
            };
            return db.collection('users').updateOne({_id : this._id}, {
                $set : {
                    card : updatedCard
                }
            });
        }).then(() => {
            return db.collection('orders').insertOne(newOrder);
        }).then(() => {
            CALLBACK_FUNCTION();
        }).catch((err) => {
            console.log(err);
        });
    }
    getOrders(CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection('orders').find({
            'user._id': this._id
        }).toArray().then((orders) => {
            CALLBACK_FUNCTION(orders);
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = User;