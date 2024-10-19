const express = require('express');
const multer = require('multer');
const Review = require('../models/Review');
const authenticateUser = require('../middleware/authenticate');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/events/:id/review', authenticateUser, upload.array('photos', 5), async (req, res) => {
    try {
        const { rating, text } = req.body;
        const photoUrls = req.files.map(file => `/uploads/${file.filename}`);
        const review = new Review({
            event_id: req.params.id,
            user_id: req.user.id,
            rating,
            text,
            photos: photoUrls
        });
        await review.save();
        res.status(201).json({ message: "Review submitted successfully", review });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
