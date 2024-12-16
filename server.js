// server.js
const express = require('express');
const mongoose = require('mongoose');
const seedDefaultCategories = require('./seeds/defaultCategories');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const IndexRoutes = require('./routes/index');


const app = express();
const PORT = process.env.PORT || 5000 ;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/habitNow';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Database connected");
        
        // Seed default categories
        await seedDefaultCategories();

        // Start the server
        app.listen(PORT,  '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Database connection error:", error);
    });

// Routes
app.use('/api', IndexRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
