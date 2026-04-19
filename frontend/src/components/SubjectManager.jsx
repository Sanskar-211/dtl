import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  Typography, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Alert,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api';

export default function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, subject: null });

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects');
      setSubjects(res.data);
    } catch (err) {
      setError('Failed to fetch subjects');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      await api.post('/subjects', { name });
      setName('');
      setError('');
      setSuccess('Subject added successfully!');
      fetchSubjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding subject');
    }
  };

  const handleDelete = async (subject) => {
    setDeleteDialog({ open: true, subject });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/subjects/${deleteDialog.subject.id}`);
      setSuccess('Subject deleted successfully!');
      fetchSubjects();
      setDeleteDialog({ open: false, subject: null });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting subject');
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, subject: null });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" gutterBottom>Subject Management</Typography>
      
      {/* Add Subject Form */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Add New Subject</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label="Subject Name"
            value={name}
            onChange={e => setName(e.target.value)}
            size="small"
            fullWidth
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Paper>

      {/* Messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Subjects List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Subjects ({subjects.length})
        </Typography>
        {subjects.length === 0 ? (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No subjects added yet
          </Typography>
        ) : (
          <List>
            {subjects.map(subj => (
              <ListItem 
                key={subj.id}
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 1, 
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>{subj.name}</Typography>
                <IconButton 
                  color="error" 
                  onClick={() => handleDelete(subj)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteDialog.subject?.name}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  Typography, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Alert,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api';

export default function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, subject: null });

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects');
      setSubjects(res.data);
    } catch (err) {
      setError('Failed to fetch subjects');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      await api.post('/subjects', { name });
      setName('');
      setError('');
      setSuccess('Subject added successfully!');
      fetchSubjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding subject');
    }
  };

  const handleDelete = async (subject) => {
    setDeleteDialog({ open: true, subject });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/subjects/${deleteDialog.subject.id}`);
      setSuccess('Subject deleted successfully!');
      fetchSubjects();
      setDeleteDialog({ open: false, subject: null });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting subject');
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, subject: null });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" gutterBottom>Subject Management</Typography>
      
      {/* Add Subject Form */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Add New Subject</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label="Subject Name"
            value={name}
            onChange={e => setName(e.target.value)}
            size="small"
            fullWidth
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Paper>

      {/* Messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Subjects List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Subjects ({subjects.length})
        </Typography>
        {subjects.length === 0 ? (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No subjects added yet
          </Typography>
        ) : (
          <List>
            {subjects.map(subj => (
              <ListItem 
                key={subj.id}
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 1, 
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>{subj.name}</Typography>
                <IconButton 
                  color="error" 
                  onClick={() => handleDelete(subj)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteDialog.subject?.name}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 