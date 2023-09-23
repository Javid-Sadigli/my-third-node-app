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
}

module.exports = User;