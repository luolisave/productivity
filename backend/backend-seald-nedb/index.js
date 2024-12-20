const express = require('express')
var cors = require('cors')
var myConfig = require('./my-config');


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

// https://github.com/seald/nedb
// Type 3: Persistent datastore with automatic loading
const Datastore = require('@seald-io/nedb')
const db = new Datastore({ filename: myConfig.dbName, autoload: true }) // You can await db.autoloadPromise to catch a potential error when autoloading.
// You can issue commands right away


app.get('/hello', function (req, res) {
  res.send('Hello World')
});

app.get('/atom/list', async function (req, res) {
  if (
    req.query.type && req.query.type !== ''
  ){
    const type = req.query.type;
    try {
      const docs = await db.findAsync({ type }); 
      let myRecords = docs.map((item)=> item);
      res.send({status:1, info:'get records successfully', records: myRecords});
    } catch (error) {
      res.send({status: 0, info: "something wrong while get record from database.", type, key});
    }
      
  } else {
      res.send({status:0, info:'type and key cannot be undefined!'});
  }
  
});

app.get('/atom', async function (req, res) {
  if (
    req.query.type && req.query.type !== '' &&
    req.query.key && req.query.key !== '' 
  ){
    const type = req.query.type;
    const key = req.query.key;
    try {
      const docs = await db.findAsync({ type, key }); 
      if (docs && docs.length) {
        let myData = docs[docs.length-1].record;
        res.send({status:1, info:'get record successfully', record: myData});
      } else {
        res.send({status: 0, info: "no record for such type and key", type, key});
      }
    } catch (error) {
      res.send({status: 0, info: "something wrong while get record from database.", type, key});
    }
      
  } else {
      res.send({status:0, info:'type and key cannot be undefined!'});
  }
  
});

app.post('/atom', async function (req, res) {
  if (
    req.query.type && req.query.type !== '',
    req.query.key && req.query.key !== '' 
  ){
      const type = req.query.type;
      const key = req.query.key;
      let bodyDocument;
      if (req.body) {
        bodyDocument = req.body;
      } else {
        bodyDocument = {};
      }

      try {
        const docs = await db.findAsync({ type, key }); 
        // console.log('docs', docs);

        if (docs && docs.length) { // document already exist, update
          const { numAffected } = await db.updateAsync({ type, key }, {$set: {type, key, record: bodyDocument}}, {});
          // console.log('-----update');
          res.send({status: 1, info: "record updated.", numAffected, record: {type, key, record: bodyDocument}})
        } else { // create new one
          const newDoc = await db.insertAsync({type, key, record: bodyDocument});
          // console.log('-----create');  
          res.send({status: 1, info: "record created.", record: newDoc});
        }
        
      } catch (error) {
        res.send({status: 0, info: "something wrong while inserting record to database.", type, key}); 
      }
  }
});


app.delete('/atom', async function (req, res) {
  if (
    req.query.type && req.query.type !== '' &&
    req.query.key && req.query.key !== '' 
  ){
    const type = req.query.type;
    const key = req.query.key;
    try {
      const numRemoved = await db.removeAsync({ type, key }, { multi: true }); 
      console.log('delete numRemoved = ', numRemoved);
      res.send({status:1, info:`deleted ${numRemoved} record(s) successfully`, numRemoved});
      // if (docs && docs.length) {
      //   let myData = docs[docs.length-1].record;
      //   res.send({status:1, info:'get record successfully', record: myData});
      // } else {
      //   res.send({status: 0, info: "no record for such type and key", type, key});
      // }
    } catch (error) {
      res.send({status: 0, info: "something wrong while DELETE record from database.", type, key});
    }
      
  } else {
      res.send({status:0, info:'type and key cannot be undefined!'});
  }
  
});

app.listen(3000);