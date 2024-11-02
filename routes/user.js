const { Router } = require('express');
const db = require('../database');
const router = Router();


//get requests

//login
router.get('/', async (req,res) => {
  const {In_user_name, In_password} = req.query;
  if (!In_user_name || !In_password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const [rows] = await db.promise().query('SELECT password FROM User WHERE user_name = ?', [In_user_name]);

    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }

    const storedPassword = rows[0];

    if (In_password == storedPassword) {
      res.status(200).send('Password accepted');
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//post requests

//create account
router.post('/', (req,res) => {
  const {user_name, email_add, password, user_location} = req.body;
  if (user_name && email_add && password){
    try {
    db.promise().query(`INSERT INTO User VALUES('${user_name}', '${email_add}','${password}', '${user_location}')`);
    res.status(201).redirect('http://127.0.0.1:5500/login.html');
    }
    catch (err) {
      console.log(err);
    }
  }

});
  
  module.exports = router;