const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configDB = require('./app/config/database.js');

const app = express();
// let userRoutes = require('./app/routes/user.js');

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());// get information from html forms/ajax calls
app.use(bodyParser.urlencoded({ extended: true }));

 // configure passport for Facebook authentication
require('./app/config/passport')(passport);

// Bootstrap db connection
mongoose.Promise = global.Promise;
const dbUrl = configDB.url;
const db = mongoose.connect(dbUrl);
// Check if MongoDB is running
mongoose.connection.on('error', function(err) {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.\n'+err);
});
mongoose.connection.on('open', function() {
  console.log('Mongoose DB connected.');
  // Initializing Express application only after Mongoose connected to DB, 
  // else Passport Session for MongoDB connection will fail in express.js file


  // here you set that all templates are located in `/public` directory
  app.use(express.static('public'));

  // here you set that you're using `ejs` template engine, 
  // and the default extension is `ejs`
  app.set('view engine', 'ejs');

  // required for passport
  const sessionMiddleware = session({
      name: "myCookie",
      secret: process.env.sessionSecret || 'arbitsessionsecret', // session secret
      resave: true,
      saveUninitialized: true,
      store: new (require("connect-mongo")(session))({
        url: dbUrl
      })
  });

  app
    .use(sessionMiddleware)
    .use(passport.initialize())
    .use(passport.session()) // persistent login sessions
    ;

  require('./app/routes/user.js')(app, passport); // load our user routes and pass in our app and fully configured passport


  const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log('Node server Listening on port:' + server.address().port);
  });

  require('./app/controllers/chat')(server, sessionMiddleware); // load our user routes and pass in our app and fully configured passport

  // Below is the default Error Handler Middleware
  app.use((err, req, res, next) => {
    console.log('Uncaught Err:'+JSON.stringify(err));
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).send({ error: err });
  });
  // Below is the default 404 Router Middleware
  app.use((req, res) => {
    res.status(404).send({
      url: req.originalUrl,
      error: 'Not Found'
    });
  });

});

