import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
} from "@mui/material";
import { app } from "../firebase/firebaseConfig";
import { getDatabase, push, ref, set } from "firebase/database";

const StudentAdd = () => {
  const [gender, setGender] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [date, setDate] = useState("");
  const [LastName, setLastName] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [email, setEmail] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [Class, setClass] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for showing success alert
  const [error, setError] = useState(false); // State for showing error alert

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  const classs = (e: any) => {
    setClass(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Form submitted!");

    // Check for empty fields
    if (
      Firstname.trim() === "" ||
      LastName.trim() === "" ||
      date.trim() === "" ||
      email.trim() === "" ||
      RollNo.trim() === "" ||
      Class.trim() === "" ||
      gender.trim() === ""
    ) {
      setError(true); // Show error message
      setTimeout(() => {
        setError(false); // Hide error message after 3 seconds
      }, 3000);
      return; // Prevent form submission
    }

    const db = getDatabase(app);
    const studentRef = ref(db, "StudentAdd"); // Reference to 'StudentAdd' collection

    // Data to be saved to Firebase
    const formData = {
      Firstname: Firstname,
      MiddleName: MiddleName,
      DateOfBirth: date,
      LastName: LastName,
      FatherName: FatherName,
      MotherName: MotherName,
      Email: email,
      RollNo: RollNo,
      Class: Class,
      Gender: gender,
    };

    // Push new data to Firebase
    push(studentRef, formData)
      .then((newRef) => {
        console.log(
          "Data successfully written to Firebase with key:",
          newRef.key
        );
        setShowAlert(true); // Show success alert
        setTimeout(() => {
          setShowAlert(false); // Hide success alert after 3 seconds
        }, 3000);
        // Reset form fields after successful submission (optional)
        setFirstname("");
        setMiddleName("");
        setDate("");
        setLastName("");
        setFatherName("");
        setMotherName("");
        setEmail("");
        setRollNo("");
        setClass("");
        setGender("");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        // Handle error scenario
      });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginTop: "50px", textAlign: "center" }}>
        Student Add Page
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "80%",
          }}
        >
          <TextField
            fullWidth
            value={Firstname}
            onChange={(e) => setFirstname(e.target.value)}
            label="First Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            value={MiddleName}
            onChange={(e) => setMiddleName(e.target.value)}
            label="Middle Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            value={date}
            onChange={handleDateChange}
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "80%",
          }}
        >
          <TextField
            fullWidth
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            label="Father Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            value={MotherName}
            onChange={(e) => setMotherName(e.target.value)}
            label="Mother Name"
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "80%",
          }}
        >
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            variant="outlined"
          />
          <TextField
            fullWidth
            value={RollNo}
            onChange={(e) => setRollNo(e.target.value)}
            label="Roll No"
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Class</InputLabel>
            <Select value={Class} onChange={classs} label="Class">
              {Array.from(Array(10), (_, i) => (
                <MenuItem key={i + 1} value={`${i + 1}th`}>{`${
                  i + 1
                }th`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "80%",
          }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
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
    </Box>
  );
};

export default StudentAdd;
