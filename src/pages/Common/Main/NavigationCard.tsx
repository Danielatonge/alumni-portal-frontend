import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Description } from 'components/Description/Description';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

type NavigationCardProps = {
    name: string;
    caption: string;
    icon: FunctionComponent<any>;
    to: string;
};

export const NavigationCard = ({
    icon: Icon,
    name,
    caption,
    to,
}: NavigationCardProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };
    return (
        <Card className={styles.navigationCard} elevation={0}>
            <ButtonBase onClick={handleClick} className={styles.buttonCard}>
                <CardContent className={styles.cardContent}>
                    <div className={styles.cardCaption}>
                        <Description>{name}</Description>
                        <Typography
                            className={styles.cardCaptionText}
                            variant="body2"
                        >
                            {caption}
                        </Typography>
                    </div>
                    <div className={styles.cardIcon}>
                        <Icon />
                    </div>
                </CardContent>
            </ButtonBase>
        </Card>
    );
};
