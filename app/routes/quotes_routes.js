
module.exports = function (app, db, quotesCollection){

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
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  });

}
