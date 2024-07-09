import { Box, TableRow, TableCell, Table, TableHead, TableBody, Button, TextField } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';

const Teacherlist = () => {
    const [teacherdata, setTeacherdata] = useState({});
    const [fulldeatail , setfulldeatail] = useState(false);

    useEffect(() => {
        const db = getDatabase(app);
        const reff = ref(db, 'Teacher');

        onValue(reff, (snapshot) => {
            const teachers = snapshot.val();
            if (teachers) {
                setTeacherdata(teachers);
            } else {
                setTeacherdata({});
            }
        });

        // Clean up function for unmounting
        return () => {
            // Unsubscribe from database changes
            // Although Firebase doesn't require explicit unsubscribe for onValue
        };
    }, []);

    const handleViewDetails = (key:any) => {
        // Implement detail view functionality if needed
        console.log(`View details for teacher with key: ${key}`);
    };

    return (
        <Box>
            <h1 style={{ marginTop: 50 }}>Teacher List Screen</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Address</b></TableCell>
                        <TableCell><b>Mobile Number</b></TableCell>
                        <TableCell><b>Action</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(teacherdata).map(([key, value]:any) => (
                        <TableRow key={key}>
                            <TableCell>{value.name}</TableCell>
                            <TableCell>{value.address}</TableCell>
                            <TableCell>{value.mobileNumber}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleViewDetails(key)}
                                >
                                    Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </Box>
    );
};

export default Teacherlist;
