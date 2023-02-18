import { Box } from '@mui/material';

import { useRecoilValue } from 'recoil';
import { alumniNetworkState } from 'state/network';
import { AlumniCard } from './AlumniCard';

export const NetworkPage = () => {
    const { data } = useRecoilValue(alumniNetworkState);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {data?.users.map((user: any) => (
                <AlumniCard alumni={user} />
            ))}
        </Box>
    );
};
