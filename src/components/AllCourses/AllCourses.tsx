import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';

import {
    useRecoilRefresher_UNSTABLE,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';
import {
    allCoursesState,
    allCoursesTagsState,
    allCoursesWithRequestsState,
} from 'state/courses';

import { CourseCard } from 'components/CourseCard/CourseCard';
import { useEffect, useRef, useState } from 'react';
import { userRoleState } from 'state/user';
import { ROLES } from 'types/user';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

import api from 'api';
import { notificationState } from 'state/notification';

export const AllCourses = () => {
    const ROLE = useRecoilValue(userRoleState);
    const setNotification = useSetRecoilState(notificationState);
    const { data: coursesData } = useRecoilValue(
        ROLE === ROLES.ALUMNI ? allCoursesState : allCoursesWithRequestsState,
    );
    const { data: tagsData } = useRecoilValue(allCoursesTagsState);
    const [searchParams, setSearchParams] = useSearchParams();
    const refreshAllCourses = useRecoilRefresher_UNSTABLE(allCoursesState);
    const refreshAllTags = useRecoilRefresher_UNSTABLE(allCoursesTagsState);

    const openId = useRef<number>(1);
    useEffect(() => {
        refreshAllCourses();
    }, []);

    const selectedTags =
        searchParams.getAll('tags').length === 0
            ? ['All']
            : searchParams.getAll('tags');

    const handleTagClicked = (name: string) => {
        if (name === 'all') {
            setSearchParams({ tags: ['All'] });
        } else if (selectedTags.includes(name)) {
            setSearchParams({
                tags:
                    selectedTags.length === 1
                        ? ['All']
                        : selectedTags.filter(tag => tag !== name),
            });
        } else {
            setSearchParams({
                tags: [...selectedTags.filter(tag => tag !== 'All'), name],
            });
        }
    };

    const handleTagDelete = async (id: number) => {
        const { response } = await api.courses.deleteTag({ id });
        if (response) {
            refreshAllTags();
            setNotification({
                open: true,
                message: 'Tag has been added successfully',
                severity: 'success',
            });
        }
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newTagName, setNewTagName] = useState('');

    const handleAddTag = async () => {
        const { response } = await api.courses.addNewTag({
            name: newTagName,
        });

        if (response) {
            handleClose();
            refreshAllTags();
            setNewTagName('');
            setNotification({
                open: true,
                message: 'Tag has been added successfully',
                severity: 'success',
            });
            openId.current += 1;
        }
    };
    return (
        <div>
            {tagsData && (
                <Stack direction="row" spacing={1}>
                    <Chip
                        onClick={() => handleTagClicked('all')}
                        label="All"
                        variant={
                            selectedTags.includes('All') ? 'filled' : 'outlined'
                        }
                        color="primary"
                        key="all"
                    />
                    {tagsData.tags.map(({ name, id }) => (
                        <Chip
                            onClick={() => handleTagClicked(name)}
                            label={name}
                            variant={
                                selectedTags.includes(name)
                                    ? 'filled'
                                    : 'outlined'
                            }
                            color="primary"
                            key={name}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...(ROLE === ROLES.ADMIN
                                ? { onDelete: () => handleTagDelete(id) }
                                : {})}
                        />
                    ))}
                    {ROLE === ROLES.ADMIN && (
                        <Chip
                            onClick={handleClickOpen}
                            label="+"
                            color="primary"
                            key="add"
                        />
                    )}
                </Stack>
            )}
            {coursesData && (
                <div>
                    {coursesData.courses
                        .filter(({ tags }) => {
                            if (selectedTags[0] === 'All') {
                                return true;
                            }
                            for (
                                let index = 0;
                                index < tags.length;
                                index += 1
                            ) {
                                const courseTag = tags[index];
                                if (selectedTags.includes(courseTag)) {
                                    return true;
                                }
                            }
                            return false;
                        })
                        .map((course: any) => (
                            <CourseCard course={course} key={course.id} />
                        ))}
                </div>
            )}
            <Dialog
                key={openId.current}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add new tag</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tag name"
                        value={newTagName}
                        onChange={e => setNewTagName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddTag} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
