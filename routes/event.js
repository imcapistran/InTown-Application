const { Router } = require('express');
const db = require('../database');
const router = Router();


//get requests
router.get('/', (req,res,next) => {
  console.log('Request made to /EVENT ROUTE');
  next();
});

router.get('/', async (req,res) => {
  const results = await db.promise().query(`SELECT * FROM Event`);
  console.log(results);
    res.status(200).send(results[0]);
  });

//post requests
router.post('/', (req,res) => {
  const {event_name, start_time, end_time, event_description, event_location, event_img} = req.body;
  if (event_name && start_time && end_time && event_location){
    try {
    db.promise().query(`INSERT INTO Event (user_name, event_name, start_time, end_time, event_description, event_location, event_img) VALUES('testUser', '${event_name}', '${start_time}', '${end_time}', '${event_description}', '${event_location}', '${event_img}')`);
    res.status(201).redirect('/Home.html');
    }
    catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;