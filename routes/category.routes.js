const express = require('express');
const router = express.Router();
const Category = require('../models/Category.model');
const Icon = require('../models/Icon.model');
const Color = require('../models/Color.model');
const { authenticateToken } = require('../middlewares/auth.middleware');
// Retrieve all categories (default and user-specific custom)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const defaultCategories = await Category.find({ type: 'default' });
        const customCategories = await Category.find({ type: 'custom', userId: req.user.id });
        res.status(200).json([...defaultCategories, ...customCategories]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error: error.message });
    }
});

// Create a new custom category
router.post('/', authenticateToken, async (req, res) => {
    const { name, description, icon, color } = req.body;

    if (!name || !icon || !color) {
        return res.status(400).json({ message: 'Name, icon, and color are required fields' });
    }

    try {
        const newCategory = new Category({
            name,
            description,
            icon,
            color,
            type: 'custom',
            userId: req.user.id,
        });

        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
});

// Retrieve all available icons
router.get('/icons', authenticateToken, async (req, res) => {
    try {
        const icons = await Icon.find();
        res.status(200).json(icons);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving icons', error: error.message });
    }
});

// Retrieve all available colors
router.get('/colors', authenticateToken, async (req, res) => {
    try {
        const colors = await Color.find();
        res.status(200).json(colors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving colors', error: error.message });
    }
});

module.exports = router;
