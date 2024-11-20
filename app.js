
//Checks if inputs are blank, Needs Password validators!!
function validateForm() {
    var x = document.forms["userLogin"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }

  //connection to routes
  const userRoute = require('./routes/user');
  const eventRoute = require('./routes/event');
  const path = require('path');
  const db = require('./database');
  //middleware require
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');

// initialze using local strategy
const initializePassport = require('./passport_config');
initializePassport(
  passport,
  async user_name => {
    const [temp] = await db.promise().query(`SELECT user_name, email_add, password FROM User WHERE BINARY user_name = '${user_name}'`);
    return temp[0];
  },
  async email => {
  const temp = await db.promise().query(`SELECT user_name, email_add, password FROM User WHERE email_add = '${email}'`);
    return temp[0];
  }
);

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//regester routes
app.use('/user', userRoute);
app.use('/event', checkAuthenticated, eventRoute);

app.use('/public', checkAuthenticated, express.static(path.join(__dirname, 'public')));
app.use('/login', checkNotAuthenticated, express.static(path.join(__dirname, 'login')));

// redirects for when just the domain is entered
app.get('/',checkAuthenticated, (req, res) => {
  res.redirect('/public/Event.html');
});

// login
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/public/Event.html',
  failureRedirect: '/login/login.html',
  failureFlash: true
}));

// authentacation functions
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('user not auth');
  res.redirect('/login/login.html');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/public/Event.html');
  }
  next();
}

  //start server
  app.listen(3000, () => {
    console.log('server is running on port 3000');
  });