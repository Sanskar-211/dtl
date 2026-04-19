import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  ToggleButton, 
  ToggleButtonGroup,
  Alert,
  Paper,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import api from '../api/api';

function getTodayDate() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default function TodayLectures() {
  const [lectures, setLectures] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [historyDialog, setHistoryDialog] = useState({ open: false, date: getTodayDate() });
  const [subjects, setSubjects] = useState([]);

  const fetchLectures = async (date = getTodayDate()) => {
    try {
      // For historical dates, we need to get the day of week and fetch timetable
      const targetDate = new Date(date);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[targetDate.getDay()];
      
      const res = await api.get('/timetable');
      const allLectures = res.data;
      const dayLectures = allLectures.filter(lec => lec.day_of_week === dayOfWeek);
      setLectures(dayLectures);
    } catch (err) {
      setError('Failed to fetch lectures');
    }
  };

  const fetchAttendance = async (date = getTodayDate()) => {
    try {
      const res = await api.get(`/attendance?date=${date}`);
      const map = {};
      res.data.forEach(a => {
        map[a.subjectId] = a.status;
      });
      setAttendance(map);
    } catch (err) {
      setError('Failed to fetch attendance');
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects');
      setSubjects(res.data);
    } catch (err) {
      setError('Failed to fetch subjects');
    }
  };

  useEffect(() => {
    fetchLectures(selectedDate);
    fetchAttendance(selectedDate);
    fetchSubjects();
  }, [selectedDate]);

  const handleMark = async (subjectId, status) => {
    setLoading(true);
    try {
      await api.post('/attendance', {
        date: selectedDate,
        subjectId,
        status
      });
      setAttendance({ ...attendance, [subjectId]: status });
      setSuccess('Attendance marked successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to mark attendance');
    }
    setLoading(false);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };

  const openHistoryDialog = () => {
    setHistoryDialog({ open: true, date: selectedDate });
  };

  const handleBulkMark = async () => {
    setLoading(true);
    try {
      const entries = lectures.map(lec => ({
        subjectId: lec.subjectId,
        status: attendance[lec.subjectId] || 'NA'
      }));

      await api.post('/attendance/bulk', {
        date: historyDialog.date,
        entries
      });

      setSuccess('Bulk attendance marked successfully!');
      setHistoryDialog({ open: false, date: getTodayDate() });
      fetchAttendance(selectedDate);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to mark bulk attendance');
    }
    setLoading(false);
  };

  const isToday = selectedDate === getTodayDate();
  const isPastDate = new Date(selectedDate) < new Date(getTodayDate());

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Attendance Management</Typography>
      
      {/* Messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Date Selection */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <CalendarTodayIcon />
          <Typography variant="subtitle1">Select Date:</Typography>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            size="small"
          />
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={openHistoryDialog}
          >
            Historical View
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {formatDate(selectedDate)} {isToday && '(Today)'} {isPastDate && '(Past Date)'}
        </Typography>
      </Paper>

      {/* Lectures List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Lectures for {formatDate(selectedDate)}
        </Typography>
        
        {lectures.length === 0 ? (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No lectures scheduled for this day.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {lectures.map(lec => (
              <Grid item xs={12} key={lec.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6">
                          {lec.time} - {lec.Subject?.name || 'Unknown'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current Status: {attendance[lec.subjectId] || 'Not Marked'}
                        </Typography>
                      </Box>
                      <ToggleButtonGroup
                        value={attendance[lec.subjectId] || ''}
                        exclusive
                        onChange={(_, value) => value && handleMark(lec.subjectId, value)}
                        size="small"
                        disabled={loading}
                      >
                        <ToggleButton value="present">Present</ToggleButton>
                        <ToggleButton value="absent">Absent</ToggleButton>
                        <ToggleButton value="NA">NA</ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Historical View Dialog */}
      <Dialog open={historyDialog.open} onClose={() => setHistoryDialog({ open: false, date: getTodayDate() })} maxWidth="md" fullWidth>
        <DialogTitle>Historical Attendance Management</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Select Date:</Typography>
            <TextField
              type="date"
              value={historyDialog.date}
              onChange={(e) => setHistoryDialog({ ...historyDialog, date: e.target.value })}
              fullWidth
              size="small"
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This will mark attendance for all subjects scheduled on {formatDate(historyDialog.date)}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {subjects.map(subject => (
              <Button
                key={subject.id}
                variant="outlined"
                size="small"
                onClick={() => handleMark(subject.id, 'present')}
                disabled={loading}
              >
                Mark {subject.name} Present
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryDialog({ open: false, date: getTodayDate() })}>
            Cancel
          </Button>
          <Button onClick={handleBulkMark} variant="contained" disabled={loading}>
            Mark All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 