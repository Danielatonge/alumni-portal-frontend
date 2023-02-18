import Card from '@mui/material/Card';
import { UserAvatar } from 'components/Avatar/Avatar';
import { Description } from 'components/Description/Description';
import {
    CardContent,
    CardHeader,
    IconButton,
    IconButtonProps,
    Box,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { User } from 'types/user';
import styles from './styles.module.scss';

type PersonalDescriptionRowProps = {
    property: string;
    value: string;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

type AlumniCardProps = {
    alumni: User;
};

export const PersonalDescriptionRow = ({
    property,
    value,
}: PersonalDescriptionRowProps) =>
    value ? (
        <Box className={styles.personalDescriptionRow}>
            <div className={styles.description}>{property}</div>
            <div>{value}</div>
        </Box>
    ) : null;

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const AlumniCard = ({ alumni }: AlumniCardProps) => {
    const {
        firstName,
        lastName,
        avatarUrl,
        history,
        placeOfWork,
        position,
        telegram,
        linkedIn,
        description,
    } = alumni;
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className={styles.alumniCard}>
            <CardHeader
                avatar={
                    <UserAvatar
                        size={80}
                        firstName={firstName}
                        lastName={lastName}
                        avatarUrl={avatarUrl}
                    />
                }
                title={<Description>{`${firstName} ${lastName}`}</Description>}
                subheader={`${history[0].degree}, Graduated ${new Date(
                    history[0].dateGraduation,
                ).toLocaleDateString('en-US', {
                    year: 'numeric',
                })}`}
                action={
                    <div className={styles.actionArea}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </div>
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <PersonalDescriptionRow
                        property="About"
                        value={description}
                    />
                    <PersonalDescriptionRow
                        property="Group"
                        value={history[0].group}
                    />
                    <PersonalDescriptionRow
                        property="Place of work"
                        value={placeOfWork}
                    />
                    <PersonalDescriptionRow
                        property="Position"
                        value={position}
                    />
                    <PersonalDescriptionRow
                        property="Telegram"
                        value={telegram}
                    />
                    <PersonalDescriptionRow
                        property="LinkedIn"
                        value={linkedIn}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
};
