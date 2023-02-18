import Button from '@mui/material/Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { useFormik } from 'formik';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import {
    Card,
    CardActions,
    CardContent,
    DialogContent,
    FormControl,
    TextField,
    Typography,
} from '@mui/material';
import { userProfileState } from 'state/user';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { studyCertificateStatusState } from 'state/certificates';
import api from 'api';

const degreeMap = {
    Bachelor: "Bachelor's program",
    Master: "Master's program",
};

export const CertificatesPage = () => {
    const openId = useRef<number>(1);
    const [open, setOpen] = useState(false);
    const { data } = useRecoilValue(userProfileState);
    const refresh = useRecoilRefresher_UNSTABLE(studyCertificateStatusState);
    const studyCertificateStatus = useRecoilValue(studyCertificateStatusState);

    const educationPrograms = data?.user.history.map(({ degree }) => degree);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const formik = useFormik({
        initialValues: {
            certificateType: '1C',
            studyProgram: educationPrograms?.[0],
            comment: '',
            number: 1,
        },
        onSubmit: async values => {
            const { certificateType, studyProgram, number } = values;

            if (certificateType === '1C') {
                await api.certificates.createStudyCertificateRequest({
                    // @ts-ignore
                    use: degreeMap[studyProgram],
                    number,
                });

                refresh();
                handleClose();
                openId.current += 1;
            }
        },
    });

    return (
        <div>
            <Dialog
                key={openId.current}
                onClose={handleClose}
                open={open}
                fullScreen={fullScreen}
                fullWidth
                maxWidth="md"
                disableEnforceFocus
            >
                <DialogTitle>Order Certificate</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="certificateTypeLabel">
                                Certificate type
                            </InputLabel>
                            <Select
                                labelId="certificateTypeLabel"
                                id="certificateType"
                                name="certificateType"
                                label="Certificate type"
                                value={formik.values.certificateType}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="1C">
                                    Certificate of study at the university(on
                                    Russian)
                                </MenuItem>
                                {/* <MenuItem value="Custom">
                                    Custom certificate
                                </MenuItem> */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="numberLabel">
                                Number of certificates
                            </InputLabel>
                            <Select
                                labelId="numberLabel"
                                id="number"
                                name="number"
                                label="Number of certificates"
                                value={formik.values.number}
                                onChange={formik.handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <MenuItem value={num}>{num}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="studyProgramLabel">
                                Study program
                            </InputLabel>
                            <Select
                                labelId="studyProgramLabel"
                                id="studyProgram"
                                name="studyProgram"
                                label="Study program"
                                value={formik.values.studyProgram}
                                onChange={formik.handleChange}
                            >
                                {educationPrograms?.includes('Bachelor') && (
                                    <MenuItem value="Bachelor">
                                        {`Bacheror's program`}
                                    </MenuItem>
                                )}
                                {educationPrograms?.includes('Master') && (
                                    <MenuItem value="Master">
                                        {`Master's program`}
                                    </MenuItem>
                                )}
                            </Select>
                            <TextField
                                id="comment"
                                name="comment"
                                disabled={
                                    formik.values.certificateType !== 'Custom'
                                }
                                fullWidth
                                label="Please specify your inquiry"
                                multiline
                                minRows={2}
                                maxRows={4}
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                margin="normal"
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ padding: '16px 24px' }}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Order Certificate
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Certificate of study at the university(on Russian)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A certificate of study in Russian, which indicates that
                        the student was a student at Innopolis University, with
                        the specified information about the enrollment order and
                        the terms of study
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        Total requested number:
                        {studyCertificateStatus.data[0].Count}
                    </Typography>
                    <Typography variant="body1">
                        Number of Certificates ready:
                        {studyCertificateStatus.data[1].Done}
                    </Typography>
                </CardContent>
                <CardActions sx={{ margin: '4px' }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleOpen}
                    >
                        Order certificate
                    </Button>
                </CardActions>
            </Card>
            <div />
            <div />
        </div>
    );
};
