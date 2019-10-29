var express = require("express")
var PORT = process.env.PORT || 8080
var app = express()
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var html = require("./routing/htmlRoutes")
var api = require("./routing/apiRoutes")
var path = require("path")
require("dotenv").config()

// Authentication Routes
const session = require("express-session")
const passport = require("passport")
var MySQLStore = require('express-mysql-session')(session)
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser())

let options = {
  host: process.env.OPTIONS_HOST,
  user: process.env.OPTIONS_USER,
  password: process.env.OPTIONS_PW,
  database: process.env.OPTIONS_DB,
  secret: process.env.OPTIONS_SECRET
}

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: process.env.PW_SECRET,
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    const connection = require("./config/connection.js")

    connection.query("SELECT id, password FROM users WHERE username = ?", [username], function (err, results, fields){
      if (err) {done(err)}
      
      if (results.length === 0) {
        done(null, false)
      } else {
          const hash = results[0].password.toString()
          bcrypt.compare(password, hash, function(err, response){
        
          if(response === true) {
          
            console.log("log in totally worked")
            return done(null, {user_id: results[0].id})
        
          } else {
          
            return done(null, false)
          }
        })
      }
    })
  }
))

app.use(html);
app.use(api)

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});