const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false
});

const Subject = require('./subject')(sequelize);
const Timetable = require('./timetable')(sequelize);
const Attendance = require('./attendance')(sequelize);

// Associations
Subject.hasMany(Timetable, { foreignKey: 'subjectId' });
Timetable.belongsTo(Subject, { foreignKey: 'subjectId' });

Subject.hasMany(Attendance, { foreignKey: 'subjectId' });
Attendance.belongsTo(Subject, { foreignKey: 'subjectId' });

module.exports = {
  sequelize,
  Subject,
  Timetable,
  Attendance
}; 