
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
  //middleware
const express = require('express');
const session = require('express-session');
//const passport = require('passport');

const app = express();
/*
const initializePassport = require('./passport_config');
initializePassport(passport,
  user_name => users.find(user => user.email === user_name),
  email => users.find(user => user.id === email)
);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//regester routes
app.use('/user', userRoute);
app.use('/event', eventRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


  //start server
  app.listen(3000, () => {
    console.log('server is running on port 3000');
  });