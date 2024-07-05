import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './StudentAdd.css';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface StudentFormProps {
  onSubmit: (formData: StudentFormData) => void;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  parentInfo: string;
  previousEducation: string;
  coursesInterested: string;
  emergencyContact: string;
  selectClass: string;
}

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
});

const FormTitle = styled('h2')({
  textAlign: 'center',
  marginBottom: '20px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiInputBase-root': {
    width: '100%',
  },
});

const SubmitButton = styled(Button)({
  marginTop: '20px',
});

const StudentAdd: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    parentInfo: '',
    previousEducation: '',
    coursesInterested: '',
    emergencyContact: '',
    selectClass: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'students'), formData); // Add new document to 'students' collection
      onSubmit(formData);
      // Reset form data after submission
      setFormData({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        parentInfo: '',
        previousEducation: '',
        coursesInterested: '',
        emergencyContact: '',
        selectClass: '',
      });
    } catch (error) {
      console.error('Error adding student: ', error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add Student</FormTitle>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
        />
        <StyledTextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
        />
        <StyledTextField
          required
          fullWidth
          label="Date of Birth (DOB)"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <StyledTextField
          required
          fullWidth
          select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </StyledTextField>
        <StyledTextField
          required
          fullWidth
          select
          label="Select Class"
          name="selectClass"
          value={formData.selectClass}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          <option value="">Select Class</option>
          <option value="class1">Class 1</option>
          <option value="class2">Class 2</option>
          <option value="class3">Class 3</option>
          {/* Add more classes as needed */}
        </StyledTextField>
        <StyledTextField
          required
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={3}
        />
        <StyledTextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
        />
        <StyledTextField
          required
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <StyledTextField
          fullWidth
          label="Parent/Guardian Information"
          name="parentInfo"
          value={formData.parentInfo}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={3}
        />
        <StyledTextField
          fullWidth
          label="Previous Education Details"
          name="previousEducation"
          value={formData.previousEducation}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={3}
        />
        <StyledTextField
          fullWidth
          label="Courses/Programs Interested In"
          name="coursesInterested"
          value={formData.coursesInterested}
          onChange={handleChange}
          variant="outlined"
        />
        <StyledTextField
          fullWidth
          label="Emergency Contact"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          variant="outlined"
        />
        <SubmitButton type="submit" variant="contained" color="primary">
          Add Student
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default StudentAdd;
