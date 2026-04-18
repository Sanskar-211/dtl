const express = require('express');
const router = express.Router();
const { Attendance, Subject } = require('../models');

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const { date, subjectId, status } = req.body;
    if (!date || !subjectId || !status) return res.status(400).json({ error: 'All fields required' });
    // Upsert: if exists, update; else, create
    let record = await Attendance.findOne({ where: { date, subjectId } });
    if (record) {
      record.status = status;
      await record.save();
    } else {
      record = await Attendance.create({ date, subjectId, status });
    }
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get attendance for a specific date or date range
router.get('/', async (req, res) => {
  try {
    const { date, startDate, endDate, subjectId } = req.query;
    let where = {};
    
    // Filter by specific date
    if (date) {
      where.date = date;
    }
    
    // Filter by date range
    if (startDate && endDate) {
      where.date = {
        [require('sequelize').Op.between]: [startDate, endDate]
      };
    }
    
    // Filter by subject
    if (subjectId) {
      where.subjectId = subjectId;
    }

    const records = await Attendance.findAll({ 
      where, 
      include: Subject,
      order: [['date', 'DESC']]
    });
    res.json(records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get attendance statistics
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate, subjectId } = req.query;
    let where = {};
    
    if (startDate && endDate) {
      where.date = {
        [require('sequelize').Op.between]: [startDate, endDate]
      };
    }
    
    if (subjectId) {
      where.subjectId = subjectId;
    }

    const records = await Attendance.findAll({ where, include: Subject });
    
    const stats = {
      total: records.length,
      present: records.filter(r => r.status === 'present').length,
      absent: records.filter(r => r.status === 'absent').length,
      na: records.filter(r => r.status === 'NA').length,
      attendanceRate: records.length > 0 ? 
        (records.filter(r => r.status === 'present').length / records.length * 100).toFixed(2) : 0
    };
    
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk mark attendance for multiple subjects on a date
router.post('/bulk', async (req, res) => {
  try {
    const { date, entries } = req.body; // entries: [{subjectId, status}]
    
    if (!date || !entries || !Array.isArray(entries)) {
      return res.status(400).json({ error: 'Date and entries array required' });
    }

    const results = [];
    for (const entry of entries) {
      const { subjectId, status } = entry;
      if (!subjectId || !status) continue;
      
      let record = await Attendance.findOne({ where: { date, subjectId } });
      if (record) {
        record.status = status;
        await record.save();
      } else {
        record = await Attendance.create({ date, subjectId, status });
      }
      results.push(record);
    }
    
    res.status(201).json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 