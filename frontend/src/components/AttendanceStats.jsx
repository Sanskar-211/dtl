import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress
} from '@mui/material';
import api from '../api/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const CHART_COLORS = ['#4caf50', '#ef5350'];

function getAttendanceTone(percentage) {
  if (percentage >= 85) return 'success';
  if (percentage >= 75) return 'warning';
  return 'error';
}

export default function AttendanceStats() {
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [subjRes, attRes] = await Promise.all([
        api.get('/subjects'),
        api.get('/attendance')
      ]);
      setSubjects(subjRes.data);
      setAttendance(attRes.data);
    };
    fetchData();
  }, []);

  const getStats = subjectId => {
    const records = attendance.filter(a => a.subjectId === subjectId);
    const total = records.length;
    const present = records.filter(a => a.status === 'present').length;
    const absent = records.filter(a => a.status === 'absent').length;
    const percentage = total ? Number(((present / total) * 100).toFixed(1)) : 0;
    return { total, present, absent, percentage };
  };

  const subjectStats = useMemo(() => {
    return subjects
      .map(subj => ({
        id: subj.id,
        name: subj.name,
        ...getStats(subj.id)
      }))
      .sort((a, b) => a.percentage - b.percentage);
  }, [subjects, attendance]);

  const overview = useMemo(() => {
    const totalClasses = subjectStats.reduce((sum, item) => sum + item.total, 0);
    const totalPresent = subjectStats.reduce((sum, item) => sum + item.present, 0);
    const totalAbsent = subjectStats.reduce((sum, item) => sum + item.absent, 0);
    const overallPercentage = totalClasses
      ? Number(((totalPresent / totalClasses) * 100).toFixed(1))
      : 0;

    return {
      totalClasses,
      totalPresent,
      totalAbsent,
      overallPercentage
    };
  }, [subjectStats]);

  const pieData = [
    { name: 'Present', value: overview.totalPresent },
    { name: 'Absent', value: overview.totalAbsent }
  ].filter(item => item.value > 0);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h6" gutterBottom>
        Attendance Stats
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        A quick view of overall attendance and subject-wise performance.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Overall Attendance
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
                {overview.overallPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Classes
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
                {overview.totalClasses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Classes Attended
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 600, color: '#2e7d32' }}>
                {overview.totalPresent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={1} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Classes Missed
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 600, color: '#d32f2f' }}>
                {overview.totalAbsent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Subject-wise Attendance
            </Typography>
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present" fill="#4caf50" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="absent" name="Absent" fill="#ef5350" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Overall Split
            </Typography>
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Present</TableCell>
              <TableCell align="right">Absent</TableCell>
              <TableCell align="right">% Present</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectStats.map(subj => {
              return (
                <TableRow key={subj.id} hover>
                  <TableCell>{subj.name}</TableCell>
                  <TableCell align="right">{subj.total}</TableCell>
                  <TableCell align="right">{subj.present}</TableCell>
                  <TableCell align="right">{subj.absent}</TableCell>
                  <TableCell align="right" sx={{ minWidth: 180 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <Box sx={{ width: 90 }}>
                        <LinearProgress
                          variant="determinate"
                          value={subj.percentage}
                          color={getAttendanceTone(subj.percentage)}
                          sx={{ height: 8, borderRadius: 999 }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ minWidth: 44, textAlign: 'right' }}>
                        {subj.total ? `${subj.percentage}%` : '-'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      size="small"
                      color={getAttendanceTone(subj.percentage)}
                      label={
                        subj.total === 0
                          ? 'No Data'
                          : subj.percentage >= 85
                            ? 'Strong'
                            : subj.percentage >= 75
                              ? 'Watch'
                              : 'Low'
                      }
                      variant={subj.total === 0 ? 'outlined' : 'filled'}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 