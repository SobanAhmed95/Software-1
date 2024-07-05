import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useNavigate } from 'react-router-dom';

export default function BasicSimpleTreeView() {
  const navigate = useNavigate();

  const handleItemClick = (itemId:any) => {
    switch (itemId) {
      case 'Transfer-Student-Screen':
        navigate('/Dashboard/Transfer-Student-Screen');
        break;
      case 'student-list':
        navigate('/Dashboard/student-list');
        break;
      case 'student-Add':
        navigate('/Dashboard/student-Add');
        break;
      case 'Teacher-Add':
        navigate('/Dashboard/Teacher-Add');
        break;
      case 'Teacher-List-Screen':
        navigate('/Dashboard/Teacher-List-Screen');
        break;
      case 'Teacher-Allocation-Screen':
        navigate('/Dashboard/Teacher-Allocation-Screen');
        break;
      case 'Subject-Add-Screen':
        navigate('/Dashboard/Subject-Add-Screen');
        break;
      case 'Subject-List-Screen':
        navigate('/Dashboard/Subject-List-Screen');
        break;
      case 'Registration-Screen':
        navigate('/Dashboard/Registration-Screen');
        break;
      case 'Syllabus-Form':
        navigate('/Dashboard/Syllabus-Form');
        break;
      case 'Syllabus-List-Screen':
        navigate('/Dashboard/Syllabus-List-Screen');
        break;
      case 'Class-Form-Screen':
        navigate('/Dashboard/Class-Form-Screen');
        break;
      case 'Class-List-Screen':
        navigate('/Dashboard/Class-List-Screen');
        break;
      case 'Fee-Structure-Screen':
        navigate('/Dashboard/Fee-Structure-Screen');
        break;
      case 'Fee-Submission-Screen':
        navigate('/Dashboard/Fee-Submission-Screen');
        break;
      case 'Fee-Voucher-Screen':
        navigate('/Dashboard/Fee-Voucher-Screen');
        break;
      case 'Admission-Screen':
        navigate('/Dashboard/Admission-Screen');
        break;
      case 'Exam-Schedule-Screen':
        navigate('/Dashboard/Exam-Schedule-Screen');
        break;
      case 'Exam-Result-Screen':
        navigate('/Dashboard/Exam-Result-Screen');
        break;
      default:
        navigate('/Dashboard');
        break;
    }
  };

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <TreeItem itemId="students" label="Students">
          
          <TreeItem itemId="student-Add-page" label="Student Add Screen" onClick={() => handleItemClick('student-Add')} />
          <TreeItem itemId="student-list-page" label="Student list Screen" onClick={() => handleItemClick('student-list')} />
          <TreeItem itemId="Transfer-Student-Screen" label="Transfer Student Screen" onClick={() => handleItemClick('Transfer-Student-Screen')} />  
        </TreeItem>
        <TreeItem itemId='Teacher' label="Teacher">
        <TreeItem itemId="Teacher-Add-page" label="Teacher Add Screen" onClick={() => handleItemClick('Teacher-Add')} />                    
        <TreeItem itemId="Teacher-list-page" label="Teacher List Screen" onClick={() => handleItemClick('Teacher-List-Screen')} />                    
        <TreeItem itemId="Teacher-Allocation-page" label="Teacher Allocation Screen" onClick={() => handleItemClick('Teacher-Allocation-Screen')} />                    
        </TreeItem>
        <TreeItem itemId="Subjects" label="Subjects">
        <TreeItem itemId="Subject-Add-page" label="Subject Add Screen" onClick={() => handleItemClick('Subject-Add-Screen')} />  
        <TreeItem itemId="Subject-list-page" label="Subject List Screen" onClick={() => handleItemClick('Subject-List-Screen')} />  
        </TreeItem>
        <TreeItem itemId="School" label="School">
        <TreeItem itemId="Registration-page" label="Registration Screen" onClick={() => handleItemClick('Registration-Screen')} />  
        </TreeItem>
        <TreeItem itemId="Syllabus" label="Syllabus">
        <TreeItem itemId="Syllabus-Form" label="Syllabus Form" onClick={() => handleItemClick('Syllabus-Form')} />  

        <TreeItem itemId="Syllabus-List-Screen" label="Syllabus List Screen" onClick={() => handleItemClick('Syllabus-List-Screen')} />  
        </TreeItem>
        <TreeItem itemId="Class" label="Class">
        <TreeItem itemId="Class-Form-Screen" label="Class Form Screen" onClick={() => handleItemClick('Class-Form-Screen')} />  

        <TreeItem itemId="Class-List-Screen" label="Class List Screen" onClick={() => handleItemClick('Class-List-Screen')} />  
        </TreeItem>
        <TreeItem itemId="Fees" label="Fees">
        <TreeItem itemId="Fee-Structure-Screen" label="Fee Structure Screen" onClick={() => handleItemClick('Fee-Structure-Screen')} />  

        <TreeItem itemId="Fee-Submission-Screen" label="Fee Submission Screen" onClick={() => handleItemClick('Fee-Submission-Screen')} />  
        <TreeItem itemId="Fee-Voucher-Screen" label="Fee Voucher Screen" onClick={() => handleItemClick('Fee-Voucher-Screen')} />  
        </TreeItem>
        <TreeItem itemId="Admission" label="Admission">
        <TreeItem itemId="Admission-Screen" label="Admission Screen" onClick={() => handleItemClick('Admission-Screen')} />
          </TreeItem>
        <TreeItem itemId="Exams" label="Exams">
        <TreeItem itemId="Exam-Schedule-Screen" label="Exam Schedule Screen" onClick={() => handleItemClick('Exam-Schedule-Screen')} />
        <TreeItem itemId="Exam-Result-Screen" label="Exam Result Screen" onClick={() => handleItemClick('Exam-Result-Screen')} />
          </TreeItem>
                </SimpleTreeView>
    </Box>
  );
}
