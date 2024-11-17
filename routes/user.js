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
  
  module.exports = router;