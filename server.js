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
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.set('view engine', 'ejs')



    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: req.body.name },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote
            }
          },
          {
            upsert: true // create doc if nothing exists
          }
      )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne( { $and:
        [ { name: req.body.name }, {quote: req.body.quote} ]
      })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted quote')
        })
        .catch(error => console.error(error))
    })

//Routes full list of quotes for ejs to generate
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
        res.render('index.ejs', { quotes: results });
      })
        .catch(error => console.error(error));
    });

//Routes full list of quotes to be inserted into html element
    app.get('/quotes', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
        res.status(200).json({ quotes: results });
      })
        .catch(error => console.error(error));
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
