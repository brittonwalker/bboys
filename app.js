// require dependencies ==========================
var express   = require('express');
var app       = express();
var mongoose  = require('mongoose');
var passport  = require('passport');
var flash     = require('connect-flash');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var configDB = require('./config/database.js');

// configuration ==================================
mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration
// require('./config/passport')

// set up the express application =================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get infro from html forms

app.set('view engine', 'hbs'); // set up handlebars for templating

// required for passport
app.use(session({ secret: 'ilovebboys' })); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistant login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==========================================
// require('./app/routes.js')(app, passport);
require('./app/routes.js')(app, passport);


// launch ==========================================
app.listen(3000, function(){
  console.log('Listening on localhost 3000');
})
