require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', eventRoutes);
app.use('/api', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));