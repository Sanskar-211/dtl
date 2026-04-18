const express = require('express');
const router = express.Router();
const { Subject, Timetable, Attendance } = require('../models');

// Add a subject
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const subject = await Subject.create({ name });
    res.status(201).json(subject);
  } catch (err) {
    // Handle unique constraint error for duplicate subject names
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Subject name must be unique' });
    }
    res.status(400).json({ error: err.message });
  }
});

// List all subjects
router.get('/', async (req, res) => {
  const subjects = await Subject.findAll();
  res.json(subjects);
});

// Delete a subject
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    // Check for dependencies
    const timetableEntries = await Timetable.count({ where: { subjectId: id } });
    const attendanceRecords = await Attendance.count({ where: { subjectId: id } });

    if (timetableEntries > 0 || attendanceRecords > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete subject. It has timetable entries or attendance records.',
        timetableEntries,
        attendanceRecords
      });
    }

    await subject.destroy();
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 