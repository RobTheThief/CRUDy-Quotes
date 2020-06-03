const express     = require('express');
const bodyParser  = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const mongourl    = require('./mongourl');
const app         = express();

var cors = require('cors');
const fs = require('fs')
const path = require('path')
const spdy = require('spdy');
const PORT = process.env.PORT || 3000;

// created my own certificate with openssl for development
const options = {
  key: fs.readFileSync(path.join(__dirname, '/privateKey.key')),
  cert: fs.readFileSync(path.join(__dirname, '/certificate.crt'))
}

console.log(options)

  spdy
    .createServer(options, app)
    .listen(PORT, (error) => {
      if (error) {
        console.error(error)
        return process.exit(1)
      } else {
        console.log('Listening on port: ' + PORT + '.')
      }
    })


/*
  app.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
  });
*/

  MongoClient.connect(process.env.MONGODB_URI || 'mongodb+srv://RobTheThief:JoeMamma69@cluster0-cvv9k.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(cors())
    require('./app/routes')(app, db, quotesCollection);

//Routes html file to client to render page
    app.get('/', (req, res) => {
      try {
        res.sendFile(__dirname + '/index.html')
      } catch(err){
        (error => console.error(error))
      }
    })

  })
  .catch(error => console.error(error));


  //////////////////////////////////
  /*app.listen(3000, function() {
    console.log('Listening on 3000');
  })

  MongoClient.connect(mongourl.url, {
    useUnifiedTopology: true
  })
  //^^^^^^^^^^^^^local

  MongoClient.connect(process.env.MONGODB_URI || 'mongodb+srv://Get user from mongourl.js:Get password from mongourl.js@cluster0-cvv9k.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
  })
  *<<<<<<<<<<<<<<<<<
  // ^^^^^^^altered app.listen and MongoClient.connect for Heroku test. Test ok. Reverting back to local build to complete dev

  /*app.listen(3000, function() {
    console.log('Listening on 3000');
  })
  */
