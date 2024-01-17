const express = require('express')
var cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('public'));

// https://github.com/seald/nedb
// Type 3: Persistent datastore with automatic loading
const Datastore = require('@seald-io/nedb')
const db = new Datastore({ filename: '_db/myDatafile', autoload: true }) // You can await db.autoloadPromise to catch a potential error when autoloading.
// You can issue commands right away


const DEFAULT = "default";



app.get('/hello', function (req, res) {
  res.send('Hello World')
});

app.get('/atom', async function (req, res) {
  let jsonObject;
  if (
    req.query.type && req.query.type !== '' &&
    req.query.key && req.query.key !== '' 
  ){
    const type = req.query.type;
    const key = req.query.key;
    try {
      const docs = await db.findAsync({ type, key }); 
      if (docs && docs.length) {
        let myData = docs[docs.length-1].data;
        res.send({status:1, info:'get data successfully', data: myData});
      } else {
        res.send({status: 0, info: "no data for such type and key", type, key});
      }
    } catch (error) {
      res.send({status: 0, info: "something wrong while get data from database.", type, key});
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
        // const docs = await db.findAsync({ type, key }); 
        // console.log('docs', docs);

        if (docs && docs.length) { // document already exist, update
          const { numAffected } = await db.updateAsync({ type, key }, {$set: {type, key, data: bodyDocument}}, {});
          // console.log('-----update');
          res.send({status: 1, info: "data updated.", numAffected})
        } else { // create new one
          const newDoc = await db.insertAsync({type, key, data: bodyDocument});
          // console.log('-----create');  
          res.send({status: 1, info: "data created.", data: newDoc});
        }

        
      } catch (error) {
        res.send({status: 0, info: "something wrong while inserting data to database.", type, key});
      }
  }
});

app.listen(6000)