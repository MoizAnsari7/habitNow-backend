// server.js
const express = require('express');
const mongoose = require('mongoose');
const seedDefaultCategories = require('./seeds/defaultCategories');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes (assuming you have separate route files)
const habitRoutes = require('./routes/habit');
const recurringTaskRoutes = require('./routes/recurringTask');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');


const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/your_database_name';

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
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Database connection error:", error);
    });

// Routes
app.use('/routes/habit', habitRoutes);
app.use('/routes/recurringTask', recurringTaskRoutes);
app.use('/routes/task', taskRoutes);
app.use('/routes/user', userRoutes);
app.use('/routes/category', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
