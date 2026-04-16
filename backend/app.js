const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const subjectRoutes = require('./routes/subject');
const timetableRoutes = require('./routes/timetable');
const attendanceRoutes = require('./routes/attendance');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/subjects', subjectRoutes);
app.use('/timetable', timetableRoutes);
app.use('/attendance', attendanceRoutes);

app.get('/', (req, res) => {
  res.send('Attendance Tracker Backend is running.');
});

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); // uses a PORT
