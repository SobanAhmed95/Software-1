import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Snackbar
} from "@mui/material";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

const SyllabusForm = () => {
  const [data, setData] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [syllabus, setSyllabus] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);

  const syllabusData = {
    selectedClass: selectedClass,
    selectedSubject: selectedSubject,
    syllabus: syllabus
  };

  useEffect(() => {
    const db = getDatabase(app);
    const reff = ref(db, "Subject");
    onValue(reff, (snapshot) => {
      const subjectData = snapshot.val();
      setData(subjectData);
    });
  }, []);

  const handleClassChange:any = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedClass(event.target.value as string);
  };

  const handleSubjectChange:any = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSubject(event.target.value as string);
  };

  const handleSubmit = () => {
    if (!selectedClass || !selectedSubject || !syllabus) {
      setError(true);
      return;
    }

    const db = getDatabase(app);
    const syllabusRef = push(ref(db, "Syllabus"));
    set(syllabusRef, syllabusData)
      .then(() => {
        setShowAlert(true);
        setSelectedClass("");
        setSelectedSubject("");
        setSyllabus("");
      })
      .catch((error: any) => {
        console.error("Error writing to database", error);
        setError(true);
      });
  };

  if (data === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const classes = Object.values(data).map((item: any) => item.classSelected);
  const uniqueClasses = Array.from(new Set(classes));

  const subjects = Object.values(data)
    .reduce((acc: string[], item: any) => {
      const subjectList = [
        item.subject1,
        item.subject2,
        item.subject3,
        item.subject4,
        item.subject5,
        item.subject6,
        item.subject7,
        item.subject8,
      ].filter(Boolean);
      return [...acc, ...subjectList];
    }, []);
  const uniqueSubjects = Array.from(new Set(subjects));

  return (
    <Box margin={8}>
      <Typography variant="h4" gutterBottom>Syllabus Form</Typography>
      <div>
        <Select
          fullWidth
          displayEmpty
          value={selectedClass}
          onChange={handleClassChange}
          style={{ marginBottom: 10 }}
        >
          <MenuItem value="" disabled>
            Select Class
          </MenuItem>
          {uniqueClasses.map((classItem) => (
            <MenuItem key={classItem} value={classItem}>
              {classItem}
            </MenuItem>
          ))}
        </Select>
        <Select
          fullWidth
          displayEmpty
          value={selectedSubject}
          onChange={handleSubjectChange}
          style={{ marginBottom: 10 }}
        >
          <MenuItem value="" disabled>
            Select Subject
          </MenuItem>
          {uniqueSubjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          onChange={(e) => setSyllabus(e.target.value)}
          value={syllabus}
          label="Syllabus Details"
          multiline
          rows={4}
          variant="outlined"
          style={{ marginTop: 10 }}
        />
        <Button variant="contained" onClick={handleSubmit} color="primary" style={{ marginTop: 10 }}>
          Submit
        </Button>
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        message="Data successfully submitted!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        message="Please fill in all required fields."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default SyllabusForm;
