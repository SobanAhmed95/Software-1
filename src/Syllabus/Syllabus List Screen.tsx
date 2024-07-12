import { Box, Select, MenuItem, Typography, List, ListItem, ListItemText, Card, CardContent, Paper } from "@mui/material";
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../firebase/firebaseConfig';
import { useEffect, useState } from "react";

const Syllabuslist = () => {
  const [syllabusData, setSyllabusData] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");

  useEffect(() => {
    const db = getDatabase(app);
    const syllabusRef = ref(db, 'Syllabus');
    onValue(syllabusRef, (snapshot) => {
      const data = snapshot.val();
      setSyllabusData(data);
    });
  }, []);

  const handleClassChange:any = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedClass(event.target.value as string);
  };

  const getSubjectsForClass = (selectedClass: string) => {
    return syllabusData ? Object.values(syllabusData).filter((item: any) => item.selectedClass === selectedClass) : [];
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Syllabus List Screen</Typography>
      <Select
        value={selectedClass}
        onChange={handleClassChange}
        displayEmpty
        fullWidth
        style={{ marginBottom: 20 }}
      >
        <MenuItem value="" disabled>Select Class</MenuItem>
        {syllabusData && Array.from(new Set(Object.values(syllabusData).map((item: any) => item.selectedClass))).map((classItem, index) => (
          <MenuItem key={index} value={classItem}>
            {classItem}
          </MenuItem>
        ))}
      </Select>
      {selectedClass && (
        <Box>
          <Typography variant="h5" gutterBottom>Subjects for {selectedClass}</Typography>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <List>
              {getSubjectsForClass(selectedClass).map((item: any, index: number) => (
                <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
                  <CardContent>
                    <Typography variant="h6">{item.selectedSubject}</Typography>
                    <Typography variant="body2">{item.syllabus}</Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Syllabuslist;
