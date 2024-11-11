// seeds/defaultCategories.js
const mongoose = require('mongoose');
const Category = require('../models/Category');

const defaultCategories = [
    { name: 'Health', description: 'Health-related habits', icon: 'health-icon.png', color: '#FF5733', type: 'default' },
    { name: 'Productivity', description: 'Productivity tasks', icon: 'productivity-icon.png', color: '#33FFBD', type: 'default' },
    // Add more default categories as needed
];

const seedDefaultCategories = async () => {
    for (const category of defaultCategories) {
        const exists = await Category.findOne({ name: category.name, type: 'default' });
        if (!exists) {
            await new Category(category).save();
        }
    }
};

module.exports = seedDefaultCategories;
