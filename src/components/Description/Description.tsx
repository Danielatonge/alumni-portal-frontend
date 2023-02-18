import styles from './styles.module.scss';

type DescriptionProps = {
    children: string;
};

export const Description = ({ children }: DescriptionProps) => (
    <div>
        <h5 className={styles.signInText}>{children}</h5>
    </div>
);
