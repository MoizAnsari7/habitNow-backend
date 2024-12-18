const express = require('express');
const router = express.Router();
const Category = require('../models/Category.model');
const Icon = require('../models/Icon.model');
const Color = require('../models/Color.model');

// Retrieve all categories (default and user-specific custom)
router.get('/', async (req, res) => {
    // const userId = req.user.id;
    const defaultCategories = await Category.find();
    const customCategories = await Category.find();
    res.send([...defaultCategories, ...customCategories] || []);
});


// Create a new custom category
router.post('/', async (req, res) => {
    const { name, description, icon, color } = req.body;
    const newCategory = new Category({
        name,
        description,
        icon,
        color,
        type: 'custom',
        // userId:" req.user.id"
    });
    try {
        await newCategory.save();
        res.status(201).json({message:"Category Created",newCategory});
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
});


// Retrieve all available icons
router.get('/icons', async (req, res) => {
    const icons = await Icon.find();
    res.send(icons);
});

// Retrieve all available colors
router.get('/colors', async (req, res) => {
    const colors = await Color.find();
    res.send(colors);
});

module.exports = router;