const express = require('express')
const app = express()
app.use(express.json())

// https://www.npmjs.com/package/lmdb
const lmdb = require('lmdb');
let myDB = lmdb.open({
	path: 'my-db',
	// any options go here, we can turn on compression like this:
	compression: true,
});

// test db -----------------------------------------------------------------------
async function testDB() {
    await myDB.put('LMDB_TEST_KEY', { content: 'some test content in LMDB_TEST_KEY' });
    const text = myDB.get('LMDB_TEST_KEY').content; // 'Hello, World!'
    // console.log(`myDB.get('LMDB_TEST_KEY' =`, text);
}
testDB();
// test db ends ------------------------------------------------------------------

// function getData(key) {
//     return myDB.get(key); // 'Hello, World!'
// }

// Routes
app.use(express.static('public'));

app.get('/list/keys', function (req, res) {
    res.send(myDB.getKeys().asArray);
});

app.get('/atom', function (req, res) {
    let jsonObject;
    if (req.query.key){
        if (req.query.key === '') {
            res.send({status:0, info:'key cannot be empty!'});
        } else {
            jsonObject = myDB.get(req.query.key);
            if(!jsonObject) {
                res.send({status:0, info:'key not found!'});
            } else {
                res.send({status:1, info:'found key '+ req.query.key, data: jsonObject});
            }
            
        }
    } else {
        res.send({status:0, info:'key cannot be undefined!'});
    }
    
});

app.post('/atom', function (req, res) {
    if (req.query.key && req.query.key !== ''){
        const key = req.query.key;
        myDB.put(key, req.body).then((accept)=>{
            // console.log('/atom POST accept = ', accept, ' ', req.body);
            res.send({status: 1, info: "Save successfuly."});
        }, reject =>{
            // console.log('/atom POST reject = ', reject);
            res.send({status: 0, info: "Save Failed."});
        });
    }
});

let port = 5000;
console.log('listen on port: ',port);
app.listen(port);