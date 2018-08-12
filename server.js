const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configDB = require('./app/config/database.js');

const app = express();
// let userRoutes = require('./app/routes/user.js');

// let authRoutes = require('./app/routes/auth.js');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());// get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/config/passport')(passport); // pass passport for configuration

// Bootstrap db connection
mongoose.Promise = global.Promise;
const dbUrl=process.env.dbUrl || configDB.url;
const db = mongoose.connect(dbUrl);
// Check if MongoDB is running
mongoose.connection.on('error', function(err) {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.\n'+err);
});
mongoose.connection.on('open', function() {
  console.log('Mongoose DB connected.');
  // Initializing Express application only after Mongoose connected to DB, 
  // else Passport Session for MongoDB connection will fail in express.js file


  // app.use('/user', userRoutes);

    // here you set that all templates are located in `/views` directory
  // app.set('views', __dirname + '/public');
  app.use(express.static('public'));

  // here you set that you're using `ejs` template engine, and the
  // default extension is `ejs`
  app.set('view engine', 'ejs');
  // required for passport
  app.use(session({
      name: "myCookie",
      secret: 'arbitsessionsecret', // session secret
      resave: true,
      saveUninitialized: true,
      store: new (require("connect-mongo")(session))({
        url: dbUrl
      })
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  require('./app/routes/user.js')(app, passport); // load our user routes and pass in our app and fully configured passport

  app.use(function(req, res) {
    res.status(404).send({
      url: req.originalUrl,
      error: 'Not Found'
    });
  });

  const server = app.listen(3000, ()=>{
    console.log('Node server Listening on port:' + server.address().port);
  });

  require('./app/controllers/chat')(server); // load our user routes and pass in our app and fully configured passport


});

