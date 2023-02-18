import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { allMyCoursesState } from 'state/courses';
import { MyCourseCard } from 'components/CourseCard/MyCourseCard';
import { useEffect } from 'react';

const tags = ['All', 'Archive', 'Current', 'Pending', 'Confirmed', 'Rejected'];

const mappedCourses = (courses: any[]) =>
    courses.map((course: any) => {
        let { courseRequestStatus } = course;
        const { startDate, endDate } = course;
        if (courseRequestStatus === 'APPROVED') {
            if (new Date(startDate) < new Date()) {
                if (new Date(endDate) < new Date()) {
                    courseRequestStatus = 'ARCHIVE';
                } else {
                    courseRequestStatus = 'CURRENT';
                }
            }
        }
        return { ...course, courseRequestStatus };
    });

export const MyCourses = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useRecoilValue(allMyCoursesState);

    const selectStatus = (label: string) => {
        setSearchParams({ status: label });
    };
    const refresh = useRecoilRefresher_UNSTABLE(allMyCoursesState);

    useEffect(() => {
        refresh();
    }, []);

    const status = searchParams.get('status') || 'All';
    return (
        <div>
            <Stack direction="row" spacing={1}>
                {tags.map(label => (
                    <Chip
                        onClick={() => selectStatus(label)}
                        label={label}
                        variant={status === label ? 'filled' : 'outlined'}
                        color="primary"
                        key={label}
                    />
                ))}
            </Stack>
            <div />
            <div>
                {mappedCourses(data.courses)
                    .filter(({ courseRequestStatus }) => {
                        if (status === 'All') return true;
                        return courseRequestStatus === status.toUpperCase();
                    })
                    .map((course: any) => (
                        <MyCourseCard course={course} key={course.id} />
                    ))}
            </div>
        </div>
    );
};
