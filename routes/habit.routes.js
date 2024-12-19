const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit.model');

// Create a new Habit
router.post('/habits', async (req, res) =>  {
    try {
      const { name, description, frequency, startDate, endDate, goalCount } = req.body;
  
      const habit = new Habit({
        name,
        description,
        frequency,
        startDate,
        endDate,
        goalCount,
        createdBy: req.user._id, // Assuming user is authenticated
      });
  
      await habit.save();
  
      res.status(201).json({ success: true, data: habit });
    } catch (error) {
      console.error("Error creating habit:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });


// Retrieve habits
router.get('/habits', async (req, res) =>  {
    try {
      const habits = await Habit.find({ createdBy: req.user._id, isArchived: false });
      res.status(200).json({ success: true, data: habits });
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

// Update habit progress
router.patch('/habits/:id', async (req, res) =>{
    try {
      const { id } = req.params;
      const { date, completed } = req.body;
  
      const habit = await Habit.findById(id);
  
      if (!habit) {
        return res.status(404).json({ success: false, message: "Habit not found" });
      }
  
      const progressEntry = habit.progress.find((entry) =>
        entry.date.toISOString().split("T")[0] === date
      );
  
      if (progressEntry) {
        progressEntry.completed = completed;
      } else {
        habit.progress.push({ date, completed });
      }
  
      if (completed) habit.completedCount += 1;
  
      await habit.save();
  
      res.status(200).json({ success: true, data: habit });
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });


// Delete habit
router.delete('/habits/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const habit = await Habit.findByIdAndDelete(id);
  
      if (!habit) {
        return res.status(404).json({ success: false, message: "Habit not found" });
      }
  
      res.status(200).json({ success: true, message: "Habit deleted successfully" });
    } catch (error) {
      console.error("Error deleting habit:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

module.exports = router;
