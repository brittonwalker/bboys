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
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/skate');
require('./config/passport')(passport); // pass passport for configuration

// set up the express application =================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get infro from html forms
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs'); // set up handlebars for templating
app.use(express.static('public'))
// required for passport
app.use(session({ secret: 'ilovebboys' })); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistant login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==========================================
require('./app/routes.js')(app, passport);
require('./app/locationRouter')(app)

app.use(express.static(__dirname + '/public'));

// launch ==========================================
app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on localhost 3000');
})
