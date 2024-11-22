//establish event route
const { Router } = require('express');
const db = require('../database');
const router = Router();
const bcrypt = require('bcrypt');


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

// get user info
router.get('/info', async (req, res, next) => {
  const [user] = await req.user;
    res.status(200).json(user);
  });
  
  module.exports = router;