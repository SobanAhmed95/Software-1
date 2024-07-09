import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TransferStudentscreen from '../Students/Transfer Student Screen';
import StudentList from '../Students/Student List Screen';
import BasicSimpleTreeView from '../Components/Tree';
import StudentAdd from '../Students/Student Add';
import ErrorComponent from '../Students/error'; 
import img from '../basicpage/6565bd61-0fe6-459e-9ae4-69ead84c1fc4.png';
import TeacherAdd from '../Teacher/Teacher Add';
import Teacherlist from '../Teacher/Teacher List Screen';
import TeacherAllocation from '../Teacher/Teacher Allocation Screen';
import SubjectAdd from '../Subjects/Subject Add';
import Subjectlist from '../Subjects/Subject List Screen';
import Register from '../School/Registration';
import SyllabusFrom from '../Syllabus/Syllabus Form';
import Syllabuslist from '../Syllabus/Syllabus List Screen';
import ClassFrom from '../Class/Class Form Screen';
import Classlist from '../Class/Class List Screen';
import Feestructure from '../Fees/Fee Structure Screen';
import Feesubmission from '../Fees/Fee Submission Screen';
import Feevoucher from '../Fees/Fee Voucher Screen';
import Addmission from '../Admission/Admission Screen';
import Examschedule from '../Exam/Exam Schedule Screen';
import Examresult from '../Exam/Exam Result Screen';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Logo = styled('img')({
  width: '100px',
  margin: '16px auto',
  display: 'block',
});

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleStudentSubmit = (formData: StudentFormData) => {
  //   console.log('Student added:', formData);
    // Add logic to handle form submission, e.g., updating state, navigating to a different route, etc.
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Logo src={img} alt="Logo" />
        <Divider />
        <BasicSimpleTreeView />
        <Divider />
      </Drawer>
      <Main open={open}>
        <Routes>
          <Route path="/Dashboard/student-Add" element={<StudentAdd/>} />
          <Route path="/Dashboard/student-list" element={<StudentList />} />
          <Route path="/Dashboard/Transfer-Student-Screen" element={<TransferStudentscreen />} />
          <Route path="*" element={<ErrorComponent />} />
          <Route path='/Dashboard/Teacher-Add' element={<TeacherAdd />}/>
          <Route path='/Dashboard/Teacher-List-Screen' element={<Teacherlist />}/>
          <Route path='/Dashboard/Teacher-Allocation-Screen' element={<TeacherAllocation />}/>
          <Route path='/Dashboard/Subject-Add-Screen' element={<SubjectAdd />}/>
          <Route path='/Dashboard/Subject-List-Screen' element={<Subjectlist />}/>
          <Route path='/Dashboard/Registration-Screen' element={<Register />}/>
          <Route path='/Dashboard/Syllabus-Form' element={<SyllabusFrom />}/>
          <Route path='/Dashboard/Syllabus-List-Screen' element={<Syllabuslist />}/>
          <Route path='/Dashboard/Class-Form-Screen' element={<ClassFrom />}/>
          <Route path='/Dashboard/Class-List-Screen' element={<Classlist />}/>
          <Route path='/Dashboard/Fee-Structure-Screen' element={<Feestructure />}/>
          <Route path='/Dashboard/Fee-Submission-Screen' element={<Feesubmission />}/>
          <Route path='/Dashboard/Fee-Voucher-Screen' element={<Feevoucher />}/>
          <Route path='/Dashboard/Admission-Screen' element={<Addmission />}/>
          <Route path='/Dashboard/Exam-Schedule-Screen' element={<Examschedule />}/>
          <Route path='/Dashboard/Exam-Result-Screen' element={<Examresult />}/>
        </Routes>
      </Main>
    </Box>
  );
}
