const express = require('express');
const router = express.Router();
const { Timetable, Subject } = require('../models');

// Add or update a timetable entry
router.post('/', async (req, res) => {
  try {
    const { day_of_week, time, subjectId } = req.body;
    if (!day_of_week || !time || !subjectId) return res.status(400).json({ error: 'All fields required' });
    // Upsert: if exists, update; else, create
    let entry = await Timetable.findOne({ where: { day_of_week, time } });
    if (entry) {
      entry.subjectId = subjectId;
      await entry.save();
    } else {
      entry = await Timetable.create({ day_of_week, time, subjectId });
    }
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a timetable entry
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { day_of_week, time, subjectId } = req.body;
    
    if (!day_of_week || !time || !subjectId) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const entry = await Timetable.findByPk(id);
    if (!entry) {
      return res.status(404).json({ error: 'Timetable entry not found' });
    }

    // Check if the new time slot conflicts with another entry (excluding current entry)
    const conflictingEntry = await Timetable.findOne({
      where: { 
        day_of_week, 
        time,
        id: { [require('sequelize').Op.ne]: id }
      }
    });

    if (conflictingEntry) {
      return res.status(400).json({ error: 'Time slot already occupied' });
    }

    entry.day_of_week = day_of_week;
    entry.time = time;
    entry.subjectId = subjectId;
    await entry.save();

    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a timetable entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Timetable.findByPk(id);
    
    if (!entry) {
      return res.status(404).json({ error: 'Timetable entry not found' });
    }

    await entry.destroy();
    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List the weekly timetable
router.get('/', async (req, res) => {
  const timetable = await Timetable.findAll({ include: Subject });
  res.json(timetable);
});

// Get today's lectures
router.get('/today', async (req, res) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = days[new Date().getDay()];
  const lectures = await Timetable.findAll({
    where: { day_of_week: today },
    include: Subject
  });
  res.json(lectures);
});

module.exports = router; 