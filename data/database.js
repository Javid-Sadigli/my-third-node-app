const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (CALLBACK_FUNCTION) => {
    MongoClient.connect('mongodb+srv://JavidSadigli:W61I0z0L3Ifrdxbd@mycluster.49vowqu.mongodb.net/myshop?retryWrites=true&w=majority').then((client) => {
        _db = client.db();
        CALLBACK_FUNCTION();
    }).catch((err) => {
        console.log(err);
    });
};

const getDb = () => {
    if(_db)
    {
        return _db;
    }
    throw 'No database found!';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

