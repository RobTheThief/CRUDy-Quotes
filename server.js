const express     = require('express');
const bodyParser  = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const mongourl    = require('./mongourl');
const cors        = require('cors');
const app         = express();


const PORT        = process.env.PORT || 3000;

  app.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
  });

  MongoClient.connect(process.env.MONGODB_URI || mongourl, { 
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

/*Below is code that needs to be changed out for running the server
  both local and HTTP/2; Heroku required ssl cert so 1.1 was chosen
////////////////////////////////////////////////////////////////////

  const fs = require('fs')
  const path = require('path')
  const spdy = require('spdy');


  // created my own certificate with openssl for development
  const options = {
    key: fs.readFileSync(path.join(__dirname, '/privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, '/certificate.crt'))
  }

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
^^^^^^^^^^^^HTTP/2

  MongoClient.connect(mongourl.url, {
    useUnifiedTopology: true
  })
  //^^^^^^^^^^^^^local
  */
