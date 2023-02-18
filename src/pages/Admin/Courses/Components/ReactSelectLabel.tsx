import InputLabel from '@mui/material/InputLabel/InputLabel';

export const ReactSelectLabel = ({
    shouldBeDisplayed,
    name,
    label,
    isFocused,
}: {
    shouldBeDisplayed: boolean;
    isFocused: boolean;
    name: string;
    label: string;
}) =>
    shouldBeDisplayed ? (
        <InputLabel
            htmlFor={name}
            sx={{
                position: 'absolute',
                top: '-24px',
                background: 'white',
                backgroundColor: 'white',
                padding: '0 4px',
                left: '-2px',
                fontSize: '12px',
                ...(isFocused ? { color: '#40ba21' } : {}),
            }}
        >
            {label}
        </InputLabel>
    ) : null;
