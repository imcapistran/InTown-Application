
//Checks if inputs are blank, Needs Password validators!!
function validateForm() {
    var x = document.forms["userLogin"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }

  //connection to routes
  const express = require('express');
  const session = require('express-session');
  const userRoute = require('./routes/user');
  const eventRoute = require('./routes/event');
  //middleware
const store = new session.MemoryStore();
const app = express();

app.use(session({
  secret: 'some secret',
  cookie: {maxAge: 3000000},
  saveUninitialized: false,
  store
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next) => {
  console.log(store);
  console.log(`${req.method} - ${req.url}`);
  next();
})

//regester routes
app.use('/user', userRoute);
app.use('/event', eventRoute);

  //start server
  app.listen(3000, () => {
    console.log('server is running on port 3000');
  });