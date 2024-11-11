const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Icon = require('../models/Icon');
const Color = require('../models/Color');

// Retrieve all categories (default and user-specific custom)
router.get('/categories', async (req, res) => {
    const userId = req.user.id;
    const defaultCategories = await Category.find({ type: 'default' });
    const customCategories = await Category.find({ userId, type: 'custom' });
    res.send([...defaultCategories, ...customCategories]);
});


// Create a new custom category
router.post('/categories', async (req, res) => {
    const { name, description, icon, color } = req.body;
    const newCategory = new Category({
        name,
        description,
        icon,
        color,
        type: 'custom',
        userId: req.user.id
    });
    await newCategory.save();
    res.status(201).send(newCategory);
});
