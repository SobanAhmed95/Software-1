import { Box, Select, MenuItem } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

interface Subject {
  classSelected: string;
  subject1?: string;
  subject2?: string;
  subject3?: string;
  subject4?: string;
  subject5?: string;
  subject6?: string;
  subject7?: string;
  subject8?: string;
}

const Subjectlist = () => {
  const [data, setData] = useState<Record<string, Subject>>({});
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const subjectRef = ref(db, 'Subject');

      onValue(subjectRef, (snapshot) => {
        const subjectData = snapshot.val();
        if (subjectData) {
          setData(subjectData);
        } else {
          setData({});
        }
      });
    };

    fetchData();

    // Clean-up function (optional)
    return () => {
      // Detach the onValue listener if needed
    };
  }, []);

  const handleClassSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedClass(event.target.value);
  };

  return (
    <Box>
      <h1 style={{ marginTop: 50 }}>Subject List screen</h1>
      <Select
        value={selectedClass}
        onChange={handleClassSelectChange}
        fullWidth
        displayEmpty
        style={{ marginBottom: 10 }}
      >
        <MenuItem value="" disabled>
          Select Class
        </MenuItem>
        {Object.keys(data).map((key) => (
          <MenuItem key={key} value={key}>
            {data[key].classSelected} {/* Display the class name from Firebase data */}
          </MenuItem>
        ))}
      </Select>
      <div>
        {selectedClass && data[selectedClass] ? (
          <div>
            <h3>{data[selectedClass].classSelected}</h3>
            <p>Subject 1: {data[selectedClass].subject1}</p>
            <p>Subject 2: {data[selectedClass].subject2}</p>
            <p>Subject 3: {data[selectedClass].subject3}</p>
            <p>Subject 4: {data[selectedClass].subject4}</p>
            <p>Subject 5: {data[selectedClass].subject5}</p>
            <p>Subject 6: {data[selectedClass].subject6}</p>
            <p>Subject 7: {data[selectedClass].subject7}</p>
            <p>Subject 8: {data[selectedClass].subject8}</p>
          </div>
        ) : (
          <h2>Please select a class to view subjects</h2>
        )}
      </div>
    </Box>
  );
};

export default Subjectlist;
