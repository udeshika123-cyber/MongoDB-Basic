const { MongoClient} = require('mongodb')
let dbConnection
module.exports={
    connectionToDb : (cb)=>{
        MongoClient.connect('mongodb://localhost:27017/bookstore')
        .then((client)=>{
            dbConnection=client.db();
            return cb();
        })
        .catch((err)=>{
            console.log('MongoDB connection error:', err);
            return cb(err);
        });
    },
    getDb: () => dbConnection
};