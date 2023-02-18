import { Button } from '@mui/material';

import { AllCourses } from 'components/AllCourses/AllCourses';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { addCourseDialogState } from 'state/courses';
import { CreateCourseDialog } from './Components/CreateCourseDialog';

export const AllAvailableCourses = () => {
    const [{ open }, setOpen] = useRecoilState(addCourseDialogState);
    const openId = useRef<number>(1);

    const addNewCourse = () => {
        setOpen({ open: true, type: 'ADD', course: {} });
    };

    const handleClose = () => {
        openId.current += 1;
        setOpen({ open: false, type: 'ADD', course: {} });
    };

    return (
        <div>
            <Button
                color="primary"
                variant="outlined"
                onClick={addNewCourse}
                sx={{ mb: 3 }}
            >
                Add New Course
            </Button>
            <AllCourses />
            <CreateCourseDialog
                key={openId.current}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
};
