import Card from '@mui/material/Card';

import { Button, CardActions, Typography } from '@mui/material';

import api from 'api';
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { notificationState } from 'state/notification';
import { allMyCoursesState } from 'state/courses';
import styles from './styles.module.scss';

export const MyCourseCard = ({ course }: any) => {
    const { name, teachers, startDate, endDate, courseRequestStatus, id } =
        course;
    const setNotification = useSetRecoilState(notificationState);
    const refresh = useRecoilRefresher_UNSTABLE(allMyCoursesState);

    const cancelCourseRequest = async () => {
        const { response, error } = await api.courses.cancelCourseRequest({
            courseId: id,
        });
        if (response?.success) {
            refresh();
            setNotification({
                open: true,
                message: 'Course request has been successfully removed',
                severity: 'success',
            });
        }
        if (error) {
            setNotification({
                open: true,
                message:
                    error?.response?.data?.message || 'Something went wrong',
                severity: 'error',
            });
        }
    };
    return (
        <Card className={styles.myCourseCard}>
            <div className={styles.cardHeader}>
                <Typography color="primary">{name}</Typography>
                <Typography color="primary">
                    {new Date(startDate).toLocaleDateString('en-US')} -{' '}
                    {new Date(endDate).toLocaleDateString('en-US')}
                </Typography>
            </div>
            <div className={styles.cardSubheader}>
                <Typography variant="subtitle2">
                    {teachers.join(', ')}
                </Typography>
                <div className={styles.placesLeft}>
                    <Typography variant="subtitle2" color="primary">
                        {courseRequestStatus}
                    </Typography>
                </div>
            </div>
            <CardActions sx={{ padding: '16px' }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={cancelCourseRequest}
                >
                    Cancel request
                </Button>
            </CardActions>
        </Card>
    );
};
