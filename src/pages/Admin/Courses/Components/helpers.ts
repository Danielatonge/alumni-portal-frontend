import { ChangeEvent } from 'react';
import { Theme } from 'react-select';
import * as yup from 'yup';

export const handleSpotsChange = (
    e: ChangeEvent<HTMLInputElement>,
    handleChange: (event: {
        target: { value: number; name: string; id: string };
    }) => void,
) => {
    const inputTargetValue = parseInt(`${e.target.value}`, 10);
    let valueToSet;
    const min = 0;
    const max = 100;
    if (e.target.value === '') {
        handleChange({
            target: {
                value: 0,
                id: 'slotsAvailable',
                name: 'slotsAvailable',
            },
        });
        return;
    }

    const value = +inputTargetValue;
    if (value > max) {
        valueToSet = max;
    } else if (value < min) {
        valueToSet = min;
    } else {
        valueToSet = value;
    }

    handleChange({
        target: {
            value: valueToSet,
            id: 'slotsAvailable',
            name: 'slotsAvailable',
        },
    });
};

export const reactSelectThemeOverride = (
    reactSelectTheme: Theme,
    error: boolean = false,
) => ({
    ...reactSelectTheme,
    colors: {
        ...reactSelectTheme.colors,
        primary: '#40ba21',
        ...(error ? { neutral20: 'red' } : {}),
    },
});

export const validationSchema = yup.object({
    courseName: yup.string().required('Course name is required'),
    courseDescription: yup.string().required('Course description is required'),
    slotsAvailable: yup
        .number()
        .min(1, 'At least one spot is required')
        .required('Course spots number is required'),
    autoConfirm: yup.bool(),
    teachers: yup.object().shape({
        inputValue: yup.string(),
        value: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ value: yup.string(), label: yup.string() }),
            )
            .min(1, 'You should add at least one teacher'),
    }),
    startDate: yup
        .date()
        .required()
        .min(new Date(), 'Course should not start before today'),
    endDate: yup
        .date()
        .required()
        .min(yup.ref('startDate'), "End date can't be before start date"),
});
