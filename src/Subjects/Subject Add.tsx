import { Box, Select, MenuItem, Button, Grid, TextField ,Snackbar } from '@mui/material';
import { useState } from 'react';
import {getDatabase , ref , set ,push} from 'firebase/database'
import {app} from '../firebase/firebaseConfig'
const SubjectAdd = () => {
    const [classSelected, setClassSelected] = useState('');
    const [subject1, setsubject1] = useState('');
    const [subject2, setsubject2] = useState('');
    const [subject3, setsubject3] = useState('');
    const [subject4, setsubject4] = useState('');
    const [subject5, setsubject5] = useState('');
    const [subject6, setsubject6] = useState('');
    const [subject7, setsubject7] = useState('');
    const [subject8, setsubject8] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);

    const handleClassChange = (event:any) => {
        setClassSelected(event.target.value);
    };

    const handleSubmit = () => {
        const db = getDatabase(app);
        const subjectref = push(ref(db , 'Subjects'));
        const subjectkey = subjectref.key;
        const subjectdata = {
            classSelected : classSelected,
            subject1: subject1,
            subject2: subject2,
            subject3: subject3,
            subject4: subject4,
            subject5: subject5,
            subject6: subject6,
            subject7: subject7,
            subject8: subject8

        }
        set(ref(db , `Subject/${subjectkey}`), subjectdata)
        .then(() =>{
           setShowAlert(true);
        })
        .catch((err)=>{
           setError(true + err);
        });  
        setClassSelected('');
        setsubject1(' ');
        setsubject2(' ');
        setsubject3('');
        setsubject4('');
        setsubject5('');
        setsubject6('');
        setsubject7('');
        setsubject8('');
    };

    return (
        <Box>
            <h1 style={{ marginTop: 50 }}>Subject Add screen</h1>

            <Grid container spacing={2} style={{ marginTop: 20 }}>
                <Grid item xs={12}>
                    <Select
                        value={classSelected}
                        onChange={handleClassChange}
                        fullWidth
                        displayEmpty
                        style={{ marginBottom: 10 }}
                    >
                        <MenuItem value="" disabled>
                            Select Class
                        </MenuItem>
                        <MenuItem value="Class one">Class one</MenuItem>
                        <MenuItem value="Class two">Class two</MenuItem>
                        <MenuItem value="Class three">Class three</MenuItem>
                        <MenuItem value="Class four">Class four</MenuItem>
                        <MenuItem value="Class five">Class five</MenuItem>
                        <MenuItem value="Class six">Class six</MenuItem>
                        <MenuItem value="Class seven">Class seven</MenuItem>
                        <MenuItem value="Class eight">Class eight</MenuItem>
                        <MenuItem value="Class nine">Class nine</MenuItem>
                        <MenuItem value="Class ten">Class ten</MenuItem>
                    </Select>
                </Grid>

                {/* Two rows of TextField components */}
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 1" onChange={(e) => setsubject1(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 2" onChange={(e) => setsubject2(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 3" onChange={(e) => setsubject3(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 4" onChange={(e) => setsubject4(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 5" onChange={(e) => setsubject5(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 6" onChange={(e) => setsubject6(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 7"onChange={(e) => setsubject7(e.target.value)} margin='normal' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Subject Name 8" onChange={(e) => setsubject8(e.target.value)} margin='normal' fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!classSelected}
                    >
                        Add Subject
                    </Button>
                </Grid>
            </Grid>
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

export default SubjectAdd;
