const getDb = require('../data/database').getDb;
const mongodb = require('mongodb');
class User
{
    constructor(username, email, password)
    {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    save(CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection('users').insertOne(this).then(() => {
            CALLBACK_FUNCTION();
        }).catch((err) => {
            console.log(err);
        });
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
}

module.exports = User;