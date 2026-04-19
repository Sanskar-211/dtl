import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import SubjectManager from './components/SubjectManager.jsx';
import TimetableManager from './components/TimetableManager.jsx';
import TodayLectures from './components/TodayLectures.jsx';
import AttendanceStats from './components/AttendanceStats.jsx';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <AppBar position="static">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Subjects" />
          <Tab label="Timetable" />
          <Tab label="Today's Lectures" />
          <Tab label="Stats" />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}><SubjectManager /></TabPanel>
      <TabPanel value={tab} index={1}><TimetableManager /></TabPanel>
      <TabPanel value={tab} index={2}><TodayLectures /></TabPanel>
      <TabPanel value={tab} index={3}><AttendanceStats /></TabPanel>
      <Typography align="center" sx={{ mt: 4, color: 'gray' }}>Attendance Tracker &copy; {new Date().getFullYear()}</Typography>
    </Box>
  );
} 