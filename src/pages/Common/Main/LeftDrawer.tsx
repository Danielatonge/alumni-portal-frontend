import { useRecoilValue } from 'recoil';
import { userProfileState, userRoleState } from 'state/user';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { ReactComponent as Logout } from 'static/icons/leftMenuIcons/logout.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { APP_ROUTES } from 'consts/ROUTES';
import { useCallback } from 'react';
import { UserAvatar } from 'components/Avatar/Avatar';
import { alumniTabs, adminTabs } from './tabs';
import styles from './styles.module.scss';

type LeftDrawerProps = {
    handleDrawerClose?: () => void;
};

export const LeftDrawer = ({ handleDrawerClose }: LeftDrawerProps) => {
    const ROLE = useRecoilValue(userRoleState);

    const { data } = useRecoilValue(userProfileState);
    const { pathname } = useLocation();

    const navigate = useNavigate();
    const handleListItemClick = (to: string) => {
        navigate(to);
        if (handleDrawerClose) {
            handleDrawerClose();
        }
    };

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('access_token');
        navigate(APP_ROUTES.MAIN);
        window.location.reload();
    };

    const tabs = useCallback(() => {
        switch (ROLE) {
            case 'ALUMNI':
                return alumniTabs;
            case 'ADMIN':
                return adminTabs;

            default:
                return [];
        }
    }, [ROLE]);
    return (
        <List>
            <ListItem>
                <ListItemButton
                    onClick={() => handleListItemClick(APP_ROUTES.MAIN)}
                >
                    <img
                        src="alumni_logo.png"
                        alt="logo"
                        className="Alumni-logo"
                    />
                </ListItemButton>
            </ListItem>
            <ListItem className={styles.userInfo}>
                <ListItemIcon>
                    <UserAvatar
                        firstName={data?.user?.firstName}
                        lastName={data?.user?.lastName}
                        avatarUrl={data?.user?.avatarUrl}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={`${data?.user?.firstName} ${data?.user?.lastName}`}
                />
            </ListItem>
            {tabs().map(({ Icon, name, to }) => (
                <ListItem key={name} disablePadding>
                    <ListItemButton
                        selected={pathname === to}
                        onClick={() => handleListItemClick(to)}
                    >
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            ))}
            <ListItem
                key="logout"
                onClick={() => handleLogout()}
                className={styles.logout}
                disablePadding
            >
                <ListItemButton onClick={() => handleLogout()}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
