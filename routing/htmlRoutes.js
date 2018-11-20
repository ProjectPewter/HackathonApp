const express = require("express")
const path = require("path")
const router = express.Router()
const connection = require("../config/connection.js")
const bcrypt = require('bcrypt')
const saltRounds = 10
const cookieParser = require("cookie-parser")
const passport = require("passport")
const { check, validationResult } = require("express-validator/check")
const { sanitizeBody } = require("express-validator/filter")

router.get("/", function(req, res) {
    console.log(req.user)
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, "../public/success.html"))
        console.log(req.session.passport.user.user_id)
    } else {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    }
})

router.get("/dashboard", function(req, res) {
  if(req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../public/dash.html"))
  } else {
      res.sendFile(path.join(__dirname, "../public/register.html"))
  }
})

router.post("/login", passport.authenticate(
    "local", {
        successRedirect: "/",
        failureRedirect: "/register"
    }
))

// router.get("/dashboard", function(req, res) {
//     // var uName = req.params.username

//     // connection.query("SELECT username, email FROM users WHERE username = ?" [uName], function(error, results) {
//     //     if (err) throw err

//         res.sendFile(path.join(__dirname, "../public/dash.html"))
//     // })
// })

router.get("/logout", function(req, res) {
    req.logout()
    req.session.destroy(function() {
        res.clearCookie("connect.sid")
        res.redirect("/")
    })
})

router.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"))
})

router.post("/register", [
    check("username")
    .not()
    .isEmpty().withMessage("Username field must not be blank")
    ],function(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        res.redirect("/register.html")
    } else {
        const username = req.body.username
        const password = req.body.password
        const email = req.body.email
        
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            connection.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hash], function(err, results, fields) {
                if (err) throw err
                connection.query("SELECT LAST_INSERT_ID() as user_id", function(error, results, fields) {
                    if(error) throw error
                    const user_id = results[0]

                    req.login(user_id, function(err) {
                        res.redirect("/")
                    })
                })
            })

        });
    }
})

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
  
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware () {  
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/')
    }
}


module.exports = router