const express = require ('express')
const {connectionToDb,getDb}=require('./db')

// init app.js
const app =express()
let db;

// db connect
connectionToDb((err)=>{
    if (!err){
        db=getDb()
        app.listen(3000,()=>{
            console.log('App is listning on port 3000');
        })
        
    } else {
        console.error('Failed to connect to the database.');
    }
})

//routes
app.get('/books',(req,res)=>{
    let books= []

    db.collection('books')
        .find()
        .sort({author:1})
        .forEach(book=>books.push(book))
        .then(()=>{
            res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error:'Could not fetch the documents'});
    })
    // res.json({msg:"welcome to the API"})

    app.get('/books/:id',(req,res)=>{
        db.collection('books')
        .fineOne({_id:Objectid(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        })
        .catch(err=>{
            res.status(500).json('Could not fetch the document');
        })
    })
})