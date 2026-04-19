import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  Grid,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function TimetableManager() {
  const [subjects, setSubjects] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [form, setForm] = useState({ day: '', time: '', subjectId: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editDialog, setEditDialog] = useState({ open: false, entry: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, entry: null });

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects');
      setSubjects(res.data);
    } catch (err) {
      setError('Failed to fetch subjects');
    }
  };

  const fetchTimetable = async () => {
    try {
      const res = await api.get('/timetable');
      setTimetable(res.data);
    } catch (err) {
      setError('Failed to fetch timetable');
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchTimetable();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.day || !form.time || !form.subjectId) return;
    try {
      await api.post('/timetable', {
        day_of_week: form.day,
        time: form.time,
        subjectId: form.subjectId
      });
      setForm({ day: '', time: '', subjectId: '' });
      setError('');
      setSuccess('Timetable entry added successfully!');
      fetchTimetable();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding timetable entry');
    }
  };

  const handleEdit = (entry) => {
    setEditDialog({ open: true, entry });
  };

  const handleDelete = (entry) => {
    setDeleteDialog({ open: true, entry });
  };

  const confirmEdit = async () => {
    try {
      const { entry } = editDialog;
      await api.put(`/timetable/${entry.id}`, {
        day_of_week: entry.day_of_week,
        time: entry.time,
        subjectId: entry.subjectId
      });
      setSuccess('Timetable entry updated successfully!');
      setEditDialog({ open: false, entry: null });
      fetchTimetable();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating timetable entry');
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/timetable/${deleteDialog.entry.id}`);
      setSuccess('Timetable entry deleted successfully!');
      setDeleteDialog({ open: false, entry: null });
      fetchTimetable();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting timetable entry');
    }
  };

  const updateEditForm = (field, value) => {
    setEditDialog({
      ...editDialog,
      entry: { ...editDialog.entry, [field]: value }
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Weekly Timetable Management</Typography>

      {/* Messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Add Entry Form */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Add New Timetable Entry</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Day</InputLabel>
              <Select name="day" value={form.day} label="Day" onChange={handleChange}>
                {days.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Time</InputLabel>
              <Select name="time" value={form.time} label="Time" onChange={handleChange}>
                {times.map(time => <MenuItem key={time} value={time}>{time}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select name="subjectId" value={form.subjectId} label="Subject" onChange={handleChange}>
                {subjects.map(subj => <MenuItem key={subj.id} value={subj.id}>{subj.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleAdd} fullWidth>Add</Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Timetable Display */}
      <Typography variant="subtitle1" gutterBottom>Current Timetable:</Typography>
      <Grid container spacing={2}>
        {days.map(day => {
          const dayEntries = timetable.filter(e => e.day_of_week === day);
          return (
            <Grid item xs={12} md={6} key={day}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{day}</Typography>
                  {dayEntries.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No lectures scheduled
                    </Typography>
                  ) : (
                    dayEntries.map(entry => (
                      <Box key={entry.id} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                        p: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1
                      }}>
                        <Typography variant="body2">
                          {entry.time} - {entry.Subject?.name || 'Unknown'}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(entry)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(entry)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, entry: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Timetable Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Day</InputLabel>
                <Select
                  value={editDialog.entry?.day_of_week || ''}
                  label="Day"
                  onChange={(e) => updateEditForm('day_of_week', e.target.value)}
                >
                  {days.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Time</InputLabel>
                <Select
                  value={editDialog.entry?.time || ''}
                  label="Time"
                  onChange={(e) => updateEditForm('time', e.target.value)}
                >
                  {times.map(time => <MenuItem key={time} value={time}>{time}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Subject</InputLabel>
                <Select
                  value={editDialog.entry?.subjectId || ''}
                  label="Subject"
                  onChange={(e) => updateEditForm('subjectId', e.target.value)}
                >
                  {subjects.map(subj => <MenuItem key={subj.id} value={subj.id}>{subj.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, entry: null })}>Cancel</Button>
          <Button onClick={confirmEdit} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, entry: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this timetable entry?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {deleteDialog.entry && `${deleteDialog.entry.day_of_week} at ${deleteDialog.entry.time} - ${deleteDialog.entry.Subject?.name}`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, entry: null })}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 