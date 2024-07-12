// src/components/StudentList.tsx
import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, remove } from 'firebase/database';
import { app } from '../firebase/firebaseConfig';
import { FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar, Alert, SelectChangeEvent } from '@mui/material';

interface Student {
  Firstname: string;
  MiddleName: string;
  LastName: string;
  FatherName: string;
  MotherName: string;
  Email: string;
  RollNo: string;
  Class: string;
  Gender: string;
  DateOfBirth: string;
}

const StudentList: React.FC = () => {
  const [studentData, setStudentData] = useState<Record<string, Student> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined); // Initialize as undefined
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentKey, setStudentKey] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, 'StudentAdd'); // Reference to 'StudentAdd' collection in Firebase

    const unsubscribe = onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStudentData(data);
      } else {
        setStudentData(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching student data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedClass(event.target.value); // Ensure event.target.value is always a string
  };

  const filterStudentsByClass = () => {
    if (!selectedClass || !studentData) return [];

    const filteredStudents: Record<string, Student> = {};
    Object.entries(studentData).forEach(([key, student]) => {
      if (student.Class === selectedClass) {
        filteredStudents[key] = student;
      }
    });

    return filteredStudents;
  };

  const handleDetailsClick = (student: Student, key: string) => {
    setSelectedStudent(student);
    setStudentKey(key);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedStudent(null);
    setStudentKey(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedStudent) {
      setSelectedStudent({
        ...selectedStudent,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSaveChanges = () => {
    if (studentKey && selectedStudent) {
      const db = getDatabase(app);
      const studentRef = ref(db, `StudentAdd/${studentKey}`);
      update(studentRef, selectedStudent).then(() => {
        console.log('Student details updated successfully');
        setSnackbarMessage('Student details updated successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleDialogClose();
      }).catch((error) => {
        console.error('Error updating student details:', error);
        setSnackbarMessage('Error updating student details');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
    }
  };

  const handleDeleteStudent = () => {
    if (studentKey) {
      const db = getDatabase(app);
      const studentRef = ref(db, `StudentAdd/${studentKey}`);
      remove(studentRef).then(() => {
        console.log('Student deleted successfully');
        setSnackbarMessage('Student deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleDialogClose();
      }).catch((error) => {
        console.error('Error deleting student:', error);
        setSnackbarMessage('Error deleting student');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
    }
  };

  const filteredStudents = filterStudentsByClass();

  return (
    <div>
      <h1 style={{ marginTop: 50, textAlign: 'center' }}>Student List</h1>

      <FormControl style={{ width: '50%', marginBottom: 20 }}>
        <InputLabel id="class-filter-label">Select Class</InputLabel>
        <Select
          labelId="class-filter-label"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {Array.from(Array(10), (_, i) => (
            <MenuItem key={i + 1} value={`${i + 1}th`}>{`${i + 1}th`}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <p>Loading...</p>
      ) : studentData ? (
        Object.keys(filteredStudents).length > 0 ? (
          <Table style={{ maxWidth: 800, margin: '0 auto' }}>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(filteredStudents).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{value.RollNo}</TableCell>
                  <TableCell>{`${value.Firstname} ${value.LastName}`}</TableCell>
                  <TableCell>{value.Email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDetailsClick(value, key)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No student data available for selected class.</p>
        )
      ) : (
        <p>Error loading data. Please try again later.</p>
      )}

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <div>
              <TextField
                label="First Name"
                name="Firstname"
                value={selectedStudent.Firstname}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Middle Name"
                name="MiddleName"
                value={selectedStudent.MiddleName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="LastName"
                value={selectedStudent.LastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Father Name"
                name="FatherName"
                value={selectedStudent.FatherName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mother Name"
                name="MotherName"
                value={selectedStudent.MotherName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="Email"
                value={selectedStudent.Email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Roll No"
                name="RollNo"
                value={selectedStudent.RollNo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Class"
                name="Class"
                value={selectedStudent.Class}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                name="Gender"
                value={selectedStudent.Gender}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                name="DateOfBirth"
                value={selectedStudent.DateOfBirth}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
          <Button onClick={handleDeleteStudent} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StudentList;
