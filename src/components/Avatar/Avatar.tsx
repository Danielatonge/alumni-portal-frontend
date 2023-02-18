import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

type UserAvatarProps = {
    firstName?: string;
    lastName?: string;
    size?: number;
    avatarUrl?: string;
};
export const UserAvatar = ({
    firstName = '',
    lastName = '',
    avatarUrl,
    size = 40,
}: UserAvatarProps) =>
    avatarUrl ? (
        <Avatar
            sx={{
                bgcolor: stringToColor(firstName + lastName),
                width: size,
                height: size,
            }}
            src={avatarUrl}
        >
            {firstName[0]}
            {lastName[0]}
        </Avatar>
    ) : (
        <Avatar
            sx={{
                bgcolor: stringToColor(firstName + lastName),
                width: size,
                height: size,
            }}
        >
            {firstName[0]}
            {lastName[0]}
        </Avatar>
    );
