export type EducationHistory = {
    status: string;
    degree: string;
    group: string;
    dateGraduation: string;
};

export enum ROLES {
    ADMIN = 'ADMIN',
    ALUMNI = 'ALUMNI',
}

export type User = {
    description: string;
    email: string;
    firstName: string;
    hasPassword: boolean;
    history: Array<EducationHistory>;
    id: number;
    lastName: string;
    linkedIn: string;
    placeOfWork: string;
    position: string;
    role: ROLES;
    telegram: string;
    avatarUrl?: string;
};

export type ChangeableUserInfo = {
    placeOfWork?: string;
    position?: string;
    telegram?: string;
    linkedIn?: string;
    description?: string;
    avatarUrl?: string;
};
