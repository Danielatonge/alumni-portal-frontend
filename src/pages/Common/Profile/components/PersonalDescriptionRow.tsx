import styles from './styles.module.scss';

type PersonalDescriptionRowProps = {
    property: string;
    value: string;
};

export const PersonalDescriptionRow = ({
    property,
    value,
}: PersonalDescriptionRowProps) => (
    <div className={styles.descriptionRow}>
        <div>{property}</div>
        <div>{value}</div>
    </div>
);
