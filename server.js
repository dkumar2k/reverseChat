let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let userRoutes = require('./app/routes/user.js');
let authRoutes = require('./app/routes/auth.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Bootstrap db connection
mongoose.Promise = global.Promise;
// let dbConnectionString='mongodb://127.0.0.1/168hourlog1'
let dbConnectionString='mongodb://admin:admin123aa96@ds013495.mlab.com:13495/168hourlog1';

let db = mongoose.connect(dbConnectionString);
// Check if MongoDB is running
mongoose.connection.on('error', function(err) {
  log.error('Mongoose DB Connection Error. Make sure MongoDB is running.\n'+err);
  console.error('MongoDB Connection Error. Make sure MongoDB is running.\n'+err);
});
mongoose.connection.on('open', function() {
  console.log('Mongoose DB connected.');
  // Initializing Express application only after Mongoose connected to DB, 
  // else Passport Session for MongoDB connection will fail in express.js file
  let server = app.listen(3000, ()=>{
    console.log('Node server Listening on port:' + server.address().port);
  });
    // Request body parsing middleware

app.get('/', (req, res) => {
   console.log('***Reached Get***\n'+ JSON.stringify(req.body));
   res.status(200).end();
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

  // here you set that all templates are located in `/views` directory
  app.set('views', __dirname + '/public');

  // here you set that you're using `ejs` template engine, and the
  // default extension is `ejs`
  app.set('view engine', 'ejs');



  app.use(function(req, res) {
    res.status(404).send({
      url: req.originalUrl,
      error: 'Not Found'
    });
});
});



