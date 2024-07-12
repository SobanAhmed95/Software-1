import {
  Box,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { app } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

interface Teacher {
  name: string;
  address: string;
  mobileNumber: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  degree?: string;
  passingYear?: string;
  university?: string;
}

const Teacherlist = () => {
  const [teacherdata, setTeacherdata] = useState<Record<string, Teacher>>({});
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherkey, setTeacherkey] = useState<Teacher | null>(null);
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const db = getDatabase(app);
    const reff = ref(db, "Teacher");

    onValue(reff, (snapshot) => {
      const teachers = snapshot.val();
      if (teachers) {
        setTeacherdata(teachers);
      } else {
        setTeacherdata({});
      }
    });
  }, []);

  const handleViewDetails = (key: any, teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setTeacherkey(key);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTeacher(null);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedTeacher) {
      const { name, value } = event.target;
      setSelectedTeacher({
        ...selectedTeacher,
        [name]: value,
      });
    }
  };
  const handlesave = () => {
    if (teacherkey && selectedTeacher) {
      const db = getDatabase(app);
      const teacherref = ref(db, `Teacher/${teacherkey}`);
      update(teacherref, selectedTeacher)
        .then(() => {
          setSnackbarMessage("Student details updated successfully");
          setSnackbarSeverity("success");
          setsnackbarOpen(true);
          setOpen(false);
        })
        .catch(() => {
          setSnackbarMessage("Error updating student details");
          setSnackbarSeverity("error");
          setsnackbarOpen(true);
        });
    }
  };

  const handleDelete = () => {
    if (teacherkey) {
      const db = getDatabase(app);
      const teacherref = ref(db, `Teacher/${teacherkey}`);
      remove(teacherref)
        .then(() => {
          setSnackbarMessage("Student deleted successfully");
          setSnackbarSeverity("success");
          setsnackbarOpen(true);
          setOpen(false);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
      setSnackbarMessage("Error deleting student");
      setSnackbarSeverity("error");
      setsnackbarOpen(true);
    }
  };

  return (
    <Box>
      <h1 style={{ marginTop: 50 }}>Teacher List Screen</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Address</b>
            </TableCell>
            <TableCell>
              <b>Mobile Number</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(teacherdata).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{value.name}</TableCell>
              <TableCell>{value.address}</TableCell>
              <TableCell>{value.mobileNumber}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewDetails(key, value)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Teacher Detail</DialogTitle>
        <DialogContent>
          {selectedTeacher && (
            <div>
              <TextField
                label="Name"
                name="name"
                type="text"
                value={selectedTeacher.name}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              />
              <TextField
                label="Address"
                name="address"
                type="text"
                value={selectedTeacher.address}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              />
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                type="text"
                value={selectedTeacher.mobileNumber}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              />
              {selectedTeacher.email && (
                <TextField
                  label="Email"
                  name="email"
                  type="text"
                  value={selectedTeacher.email}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              )}
              {selectedTeacher.dateOfBirth && (
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="text"
                  value={selectedTeacher.dateOfBirth}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              )}
              {selectedTeacher.gender && (
                <TextField
                  label="Gender"
                  name="gender"
                  type="text"
                  value={selectedTeacher.gender}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              )}
              {selectedTeacher.degree && (
                <TextField
                  label="Degree"
                  name="degree"
                  type="text"
                  value={selectedTeacher.degree}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              )}
              {selectedTeacher.passingYear && (
                <TextField
                  label="Passing Year"
                  name="passingYear"
                  type="text"
                  value={selectedTeacher.passingYear}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              )}
              {selectedTeacher.university && (
                <TextField
                  label="University/School/College"
                  name="university"
                  type="text"
                  value={selectedTeacher.university}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handlesave} color="secondary">
            Save
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setsnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setsnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Teacherlist;
