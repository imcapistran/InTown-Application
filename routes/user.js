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

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//post requests

//create account
router.post('/', async (req,res) => {
  const {user_name, email_add, user_location} = req.body;
    try {
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
    db.promise().query(`INSERT INTO User VALUES('${user_name}', '${email_add}','${hashedpassword}', '${user_location}')`);
    res.status(201).redirect('/login.html');
    }
    catch (err) {
      console.log(err);
      redirect('/signUp.html');
    }

});
  
  module.exports = router;