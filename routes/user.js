//establish event route
const { Router } = require('express');
const db = require('../database');
const router = Router();



//login
router.get('/login', async (req,res) => {
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
    res.redirect('/BentoDesign');

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//post requests

//create account
router.post('/createuser', async (req,res) => {
  const {user_name, email_add, password, user_location} = req.body;
    try {
      //const hashedpassword = await bcrypt.hash(req.body.password, 10);
    db.promise().query(`INSERT INTO User VALUES('${user_name}', '${email_add}','${password}', '${user_location}')`);
    res.status(201).redirect('/login.html');
    }
    catch (err) {
      console.log(err);
      redirect('/signUp.html');
    }

});
  
  module.exports = router;