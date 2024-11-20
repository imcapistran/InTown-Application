//establish event route
const { Router } = require('express');
const db = require('../database');
const router = Router();
const bcrypt = require('bcrypt');

//create account
router.post('/createuser', async (req,res) => {
  const {user_name, email_add, password, user_location} = req.body;
    try {
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
    db.promise().query(`INSERT INTO User VALUES('${user_name}', '${email_add}','${hashedpassword}', '${user_location}')`);
    res.status(201).redirect('/login/login.html');
    }
    catch (err) {
      console.log(err);
      redirect('/login/signUp.html');
    }
});

// logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
      if (err) {
          console.error('Error logging out:', err);
          return next(err); // Pass error to Express error handler
      }
      res.redirect('/login/login.html');
  });
});
  
  module.exports = router;