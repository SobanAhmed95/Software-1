import {
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Snackbar
  } from "@mui/material";
  import { useState } from "react";
  import { getDatabase, ref, set, push } from "firebase/database";
  import { app } from "../firebase/firebaseConfig";
  
  const TeacherAdd = () => {
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [degree, setDegree] = useState("");
    const [passingYear, setPassingYear] = useState("");
    const [university, setUniversity] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);
  
    const handleChangeGender = (event:any) => {
      setGender(event.target.value);
    };
  
    const handleSubmit = (event:any) => {
      event.preventDefault();
  
      // Form validation
      if (
        name.trim() === "" ||
        gender.trim() === "" ||
        dateOfBirth.trim() === "" ||
        email.trim() === "" ||
        mobileNumber.trim() === "" ||
        degree.trim() === "" ||
        address.trim() === "" ||
        passingYear.trim() === "" ||
        university.trim() === ""
      ) {
        setError(true); // Show error message
        setTimeout(() => {
          setError(false); // Hide error message after 3 seconds
        }, 3000);
        return;
      }
  
      const db = getDatabase(app);
      const teacherRef = push(ref(db, "Teacher"));
      const teacherKey = teacherRef.key;
  
      const teacherData = {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        dateOfBirth: dateOfBirth,
        address: address,
        gender: gender,
        degree: degree,
        passingYear: passingYear,
        university: university,
      };
  
      set(ref(db, `Teacher/${teacherKey}`), teacherData)
        .then(() => {
          console.log("Form submitted successfully");
          setShowAlert(true);
          // Reset form fields after successful submission
          setName("");
          setEmail("");
          setMobileNumber("");
          setDateOfBirth("");
          setAddress("");
          setGender("");
          setDegree("");
          setPassingYear("");
          setUniversity("");
        })
        .catch((error) => {
          console.error("Error submitting form: ", error);
        });
    };
  
    return (
      <Box>
        <h1 style={{ marginTop: 50 }}>Teacher Add Screen</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            variant="outlined"
            margin="normal"
            multiline
            rows={4} // You can adjust the number of rows to fit your needs
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={gender}
              onChange={handleChangeGender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            type="text"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Passing Year"
            value={passingYear}
            onChange={(e) => setPassingYear(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="University/School/College"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            type="text"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
        </form>
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
  
  export default TeacherAdd;
  