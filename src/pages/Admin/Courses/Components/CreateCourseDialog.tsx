import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    FormControl,
    FormHelperText,
} from '@mui/material';
import { KeyboardEventHandler, useState, ChangeEvent, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import Select, { OnChangeValue, StylesConfig } from 'react-select';
import { useTheme } from '@mui/material/styles';
import CreatableSelect from 'react-select/creatable';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    addCourseDialogState,
    allCoursesTagsState,
    useRefreshCoursesStateIdState,
} from 'state/courses';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from 'api';
import { notificationState } from 'state/notification';
import { ReactSelectLabel } from './ReactSelectLabel';

import {
    handleSpotsChange,
    reactSelectThemeOverride,
    validationSchema,
} from './helpers';

interface Option {
    readonly label: string;
    readonly value: string;
}

export interface CreateCourseDialogProps {
    open: boolean;
    onClose: () => void;
}

const createOption = (label: string) => ({
    label,
    value: label,
});

export const CreateCourseDialog = ({
    onClose,
    open,
}: CreateCourseDialogProps) => {
    const dialogProps = useRecoilValue(addCourseDialogState);
    const [focusedElement, setFocusedElement] = useState<string | undefined>(
        undefined,
    );
    const setNotification = useSetRecoilState(notificationState);

    const { data } = useRecoilValue(allCoursesTagsState);

    const theme = useTheme();

    const allTags =
        data?.tags?.map(({ name, id }) => ({ value: `${id}`, label: name })) ||
        [];

    const refreshCourses = useRefreshCoursesStateIdState();

    const formik = useFormik({
        initialValues: {
            courseName: '',
            courseDescription: '',
            slotsAvailable: 0,
            autoConfirm: true,
            tags: [],
            teachers: { inputValue: '', value: [] },
            startDate: new Date(),
            endDate: new Date(),
        },
        validationSchema,
        onSubmit: async (values, actions) => {
            const {
                courseName,
                slotsAvailable,
                startDate,
                autoConfirm,
                tags,
                teachers,
            } = values;
            const course = {
                name: courseName,
                description: values.courseDescription,
                slotsAvailable,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(values.endDate).toISOString(),
                teachers: teachers.value.map(({ value }: any) => value),
                tagIds: tags.map(({ value }: any) => +value),
                autoConfirm,
            };
            const { response } = await (dialogProps.type === 'EDIT'
                ? api.courses.updateCourse(dialogProps.course.id, course)
                : api.courses.createCourse(course));
            if (response.success) {
                actions.resetForm();
                setNotification({
                    open: true,
                    message: 'Course has been successfully updated',
                    severity: 'success',
                });
                refreshCourses();
                setTimeout(() => onClose(), 0);
            }
            if (response.courses) {
                actions.resetForm();
                setNotification({
                    open: true,
                    message: 'Course has been successfully created',
                    severity: 'success',
                });
                refreshCourses();
                setTimeout(() => onClose(), 0);
            }
        },
    });

    useEffect(() => {
        if (dialogProps.type === 'EDIT') {
            formik.setValues({
                courseName: dialogProps.course.name,
                courseDescription: dialogProps.course.description,
                slotsAvailable: dialogProps.course.slotsAvailable,
                autoConfirm: dialogProps.course.autoConfirm,
                tags: dialogProps.course.tags.map(
                    ({ id, name }: { id: number; name: string }) => ({
                        value: id,
                        label: name,
                    }),
                ),
                teachers: {
                    inputValue: '',
                    value: dialogProps.course.teachers.map((value: string) => ({
                        label: value,
                        value,
                    })),
                },

                startDate: new Date(dialogProps.course.startDate),
                endDate: new Date(dialogProps.course.endDate),
            });
        }
    }, [dialogProps]);
    const handleClose = () => {
        onClose();
        formik.resetForm();
    };
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleTeachersInputKeyDown: KeyboardEventHandler<
        HTMLDivElement
    > = event => {
        const { inputValue, value } = formik.values.teachers;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                formik.setFieldValue('teachers', {
                    inputValue: '',
                    value: [...value, createOption(inputValue)],
                });
                event.preventDefault();
                break;
            default:
                break;
        }
    };

    const handleTeachersInputChange = (inputValue: string) => {
        formik.setFieldValue('teachers', {
            ...formik.values.teachers,
            inputValue,
        });
    };

    const handleTeachersChange = (value: OnChangeValue<Option, true>) => {
        formik.setFieldValue('teachers', {
            ...formik.values.teachers,
            value,
        });
    };

    const customStyles: StylesConfig<Option, true> = {
        control: base => ({
            ...base,
            height: '56px',
            minHeight: '56px',
        }),
        menuPortal: provided => ({ ...provided, zIndex: 9999 }),
        menu: provided => ({ ...provided, zIndex: 9999 }),
    };

    const handleFocus = (focused: boolean, elementName?: string) => {
        setFocusedElement(focused ? elementName : undefined);
    };

    const handleTagsChange = (value: any) => {
        formik.setFieldValue('tags', value);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="md"
            disableEnforceFocus
            onBackdropClick={handleClose}
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    {' '}
                    {dialogProps.type === 'EDIT'
                        ? 'Edit Course'
                        : 'Add new course'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={4} sx={{ marginTop: 4 }}>
                        <TextField
                            id="courseName"
                            name="courseName"
                            fullWidth
                            label="Course name"
                            value={formik.values.courseName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.courseName &&
                                Boolean(formik.errors.courseName)
                            }
                            helperText={
                                formik.touched.courseName &&
                                formik.errors.courseName
                            }
                        />
                        <TextField
                            id="courseDescription"
                            name="courseDescription"
                            fullWidth
                            label="Course Description"
                            multiline
                            minRows={2}
                            maxRows={4}
                            value={formik.values.courseDescription}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.courseDescription &&
                                Boolean(formik.errors.courseDescription)
                            }
                            helperText={
                                formik.touched.courseDescription &&
                                formik.errors.courseDescription
                            }
                        />
                        <FormControl sx={{ width: '100%' }}>
                            <ReactSelectLabel
                                name="teacher"
                                label="Teachers"
                                shouldBeDisplayed={
                                    formik.values.teachers.value.length > 0 ||
                                    focusedElement === 'teachers'
                                }
                                isFocused={focusedElement === 'teachers'}
                            />
                            <CreatableSelect
                                id="teachers"
                                components={{
                                    DropdownIndicator: null,
                                }}
                                inputValue={formik.values.teachers.inputValue}
                                isClearable
                                isMulti
                                menuIsOpen={false}
                                onChange={handleTeachersChange}
                                onInputChange={handleTeachersInputChange}
                                onKeyDown={handleTeachersInputKeyDown}
                                placeholder="Teachers"
                                value={formik.values.teachers.value}
                                styles={customStyles}
                                theme={selectTheme =>
                                    reactSelectThemeOverride(
                                        selectTheme,
                                        Boolean(formik.errors.teachers?.value),
                                    )
                                }
                                onFocus={() => handleFocus(true, 'teachers')}
                                onBlur={() => handleFocus(false)}
                            />
                            {formik.touched.teachers &&
                                Boolean(formik.errors.teachers?.value) && (
                                    <FormHelperText id="my-helper-text" error>
                                        {formik.errors.teachers?.value}
                                    </FormHelperText>
                                )}
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack direction="row" spacing={2}>
                                <DatePicker
                                    label="Start date"
                                    value={formik.values.startDate}
                                    onChange={(newValue: any) => {
                                        formik.setFieldValue(
                                            'startDate',
                                            newValue,
                                        );
                                    }}
                                    renderInput={(params: any) => (
                                        <TextField
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...params}
                                            error={
                                                formik.touched.startDate &&
                                                Boolean(formik.errors.startDate)
                                            }
                                            helperText={
                                                formik.touched.startDate &&
                                                formik.errors.startDate
                                            }
                                        />
                                    )}
                                />
                                <DatePicker
                                    label="End date"
                                    value={formik.values.endDate}
                                    onChange={(newValue: any) => {
                                        formik.setFieldValue(
                                            'endDate',
                                            newValue,
                                        );
                                    }}
                                    renderInput={(params: any) => (
                                        <TextField
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...params}
                                            error={
                                                formik.touched.endDate &&
                                                Boolean(formik.errors.endDate)
                                            }
                                            helperText={
                                                formik.touched.endDate &&
                                                formik.errors.endDate
                                            }
                                        />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                        <Stack spacing={3}>
                            <FormControl sx={{ width: '100%' }}>
                                <ReactSelectLabel
                                    name="tags"
                                    label="Tags"
                                    isFocused={focusedElement === 'tags'}
                                    shouldBeDisplayed={
                                        formik.values.tags.length > 0 ||
                                        focusedElement === 'tags'
                                    }
                                />
                                <Select
                                    id="tags"
                                    value={formik.values.tags}
                                    onChange={handleTagsChange}
                                    isMulti
                                    name="colors"
                                    options={allTags}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    placeholder="Tags"
                                    theme={reactSelectThemeOverride}
                                    onFocus={() => handleFocus(true, 'tags')}
                                    onBlur={() => handleFocus(false)}
                                />
                            </FormControl>
                        </Stack>

                        <Stack direction="row" spacing={3}>
                            <TextField
                                sx={{ width: '231px' }}
                                id="slotsAvailable"
                                name="slotsAvailable"
                                label="Spots Available"
                                type="text"
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                value={formik.values.slotsAvailable}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>,
                                ) => {
                                    handleSpotsChange(e, formik.handleChange);
                                }}
                                error={
                                    formik.touched.slotsAvailable &&
                                    Boolean(formik.errors.slotsAvailable)
                                }
                                helperText={
                                    formik.touched.courseName &&
                                    formik.errors.slotsAvailable
                                }
                            />
                            <FormControlLabel
                                sx={{ width: '231px' }}
                                control={
                                    <Switch
                                        id="autoConfirm"
                                        name="autoConfirm"
                                        checked={formik.values.autoConfirm}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Auto confirm"
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Button color="primary" variant="contained" type="submit">
                        {dialogProps.type === 'EDIT'
                            ? 'Edit Course'
                            : 'Add course'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
