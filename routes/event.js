//establish event route
const { Router } = require('express');
const db = require('../database');
const multer = require('multer');
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get all events
router.get('/', async (req,res) => {
  try {
    const [results] = await db.promise().query(`SELECT * FROM Event`);
    const events = results.map(event => {
      if (event.event_img) {
          event.event_img = Buffer.from(event.event_img).toString('base64');
      } else {
          event.event_img = null;
      }
      return event;
  });
    res.status(200).json(events);
} catch (err) {
    console.log(err);
    res.status(500).send('Error fetching events');
}
  });

// get events posted by logged in user
router.get('/myevents', async (req,res) => {
  const user_name = await req.user;
  try {
    const [results] = await db.promise().query(`SELECT * FROM Event WHERE BINARY user_name = '${user_name[0].user_name}'`);
    const events = results.map(event => {
      if (event.event_img) {
          event.event_img = Buffer.from(event.event_img).toString('base64');
      } else {
          event.event_img = null;
      }
      return event;
  });
    res.status(200).json(events);
} catch (err) {
    console.log(err);
    res.status(500).send('Error fetching events');
}
  });

//upload event
router.post('/uploadEvent', upload.single('event_img'), async (req,res) => {
  const user_name = await req.user;
  let {event_name, start_time, end_time, event_description, event_cost, event_location} = req.body;
  if (event_cost === ''){
    event_cost = '0.00';
  }
  
  let event_img = null;
  if (req.file) {
    event_img = req.file.buffer;
  }
  if (event_name && start_time && end_time && event_location){
    try {
      await db.promise().query(
        `INSERT INTO Event (user_name, event_name, start_time, end_time, event_description, event_cost, event_location, event_img) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            user_name[0].user_name,
            event_name,
            start_time,
            end_time,
            event_description,
            event_cost,
            event_location,
            event_img
        ]
    );
    res.status(201).redirect('/public/Event.html');
    }
    catch (err) {
      console.log(err);
    }
  }
});

router.post('/delete', async (req,res) => {
  let {event_id} = req.body;
  const user_name = await req.user;
  const results = await db.promise().query('SELECT user_name FROM Event WHERE BINARY event_id = ?',
    event_id
  );
  console.log(event_id);
  console.log('results =');
  console.log(results[0][0].user_name);
  console.log(user_name[0].user_name);
  if (user_name[0].user_name === results[0][0].user_name){
    try {
      await db.promise().query('DELETE FROM Event WHERE BINARY event_id = ?',
        event_id
      );
    res.status(201).redirect('/public/UserProfile.html');
    }
    catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;