const express     = require('express');
const bodyParser  = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const mongourl    = require('./mongourl');
const app         = express();

app.listen(3000, function() {
  console.log('Listening on 3000');
})



MongoClient.connect(mongourl.url, {
  useUnifiedTopology: true
})
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.use(bodyParser.urlencoded({ extended: true }));
    //sends html file with form
    app.get('/', (req,res) => {
      res.sendFile(__dirname + '/index.html');
    });

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
         res.redirect('/');
        })
        .catch(error => console.error(error));
    });

  })
  .catch(error => console.error(error));
