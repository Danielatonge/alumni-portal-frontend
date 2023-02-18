import * as React from 'react';
import Card from '@mui/material/Card';

import DoneIcon from '@mui/icons-material/Done';
import {
    Typography,
    Button,
    CardActions,
    List,
    ListItem,
    IconButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import api from 'api';
import { userRoleState } from 'state/user';
import { UserAvatar } from 'components/Avatar/Avatar';

import { notificationState } from 'state/notification';
import {
    useRecoilRefresher_UNSTABLE,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';
import { ROLES } from 'types/user';
import { addCourseDialogState, allCoursesState } from 'state/courses';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './styles.module.scss';

export const CourseCard = ({ course }: any) => {
    const setCourseDialog = useSetRecoilState(addCourseDialogState);
    const {
        name,
        teachers,
        description,
        slotsAvailable,
        slotsOccupied,
        id,
        applied,
        startDate,
        endDate,
        tags,
        autoConfirm,
        appliedUsers,
    } = course;

    const ROLE = useRecoilValue(userRoleState);
    const setNotification = useSetRecoilState(notificationState);
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    const refresh = useRecoilRefresher_UNSTABLE(allCoursesState);

    const applyForACourse = async () => {
        const { response, error } = await api.courses.applyForCourse({
            courseId: id,
        });
        if (response?.success) {
            refresh();
            setNotification({
                open: true,
                message: 'Course request has been successfully sent',
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
    const deleteCourse = async () => {
        const { response, error } = await api.courses.deleteCourse({
            id,
        });
        if (response?.success) {
            refresh();
            setNotification({
                open: true,
                message: 'Course has been successfully removed',
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

    const editCourse = () => {
        setCourseDialog({
            open: true,
            type: 'EDIT',
            course: {
                name,
                teachers,
                description,
                slotsAvailable,
                slotsOccupied,
                id,
                startDate,
                endDate,
                tags,
                autoConfirm,
            },
        });
    };

    const rejectCourseRequest = async (requestId: number) => {
        await api.courses.updateCourseRequestStatus({
            requestIds: [requestId],
            status: 'REJECTED',
        });
    };

    const approveCourseRequest = async (requestId: number) => {
        await api.courses.updateCourseRequestStatus({
            requestIds: [requestId],
            status: 'CONFIRMED',
        });
    };

    return (
        <Card className={styles.courseCard}>
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
                    <Typography variant="subtitle2">
                        {slotsOccupied} / {slotsAvailable} booked
                    </Typography>
                    <PersonOutlineIcon sx={{ fontSize: '16px' }} />
                </div>
            </div>
            <CardContent className={styles.courseDescription}>
                {isReadMore
                    ? `${description.slice(0, 300)}${
                          description.length > 300 ? '...' : ''
                      }`
                    : description}
                {description.length > 300 && (
                    <Button size="small" onClick={toggleReadMore}>
                        {isReadMore ? 'More' : ' Show less'}
                    </Button>
                )}
                {ROLE === ROLES.ADMIN && (
                    <List component="nav" aria-label="main mailbox folders">
                        {appliedUsers.map(
                            ({
                                firstName,
                                lastName,
                                courseRequestStatus,
                                courseRequestId,
                            }: any) => (
                                <ListItem
                                    key={`${firstName} ${lastName}`}
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                disabled={
                                                    courseRequestStatus ===
                                                    'REJECTED'
                                                }
                                                edge="end"
                                                aria-label="discard"
                                                color="error"
                                                onClick={() =>
                                                    rejectCourseRequest(
                                                        courseRequestId,
                                                    )
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                            <IconButton
                                                disabled={
                                                    courseRequestStatus ===
                                                    'CONFIRMED'
                                                }
                                                edge="end"
                                                aria-label="approve"
                                                color="primary"
                                                onClick={() =>
                                                    approveCourseRequest(
                                                        courseRequestId,
                                                    )
                                                }
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemAvatar>
                                        <UserAvatar
                                            firstName={firstName}
                                            lastName={lastName}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${firstName} ${lastName}`}
                                    />
                                </ListItem>
                            ),
                        )}
                    </List>
                )}
            </CardContent>

            <CardActions sx={{ padding: '16px' }}>
                {ROLE === ROLES.ADMIN && (
                    <>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={editCourse}
                        >
                            Edit Course
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={deleteCourse}
                        >
                            Delete Course
                        </Button>
                    </>
                )}
                {ROLE === ROLES.ALUMNI &&
                    (applied ? (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={cancelCourseRequest}
                        >
                            Cancel request
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            onClick={applyForACourse}
                        >
                            Apply
                        </Button>
                    ))}
            </CardActions>
        </Card>
    );
};
