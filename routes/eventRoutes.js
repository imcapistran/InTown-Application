const express = require('express');
const Event = require('../models/Event');
const authenticateUser = require('../middleware/authenticate');  // Placeholder for authentication logic
const router = express.Router();

// DELETE: Remove Event
router.delete('/events/:id', authenticateUser, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (event.creator_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this event" });
        }
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
