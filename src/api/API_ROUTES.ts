export enum API_ALUMNI_ROUTES {
    REGISTER = '/signup',
    AUTHORIZATION_URL = '/sso/openIdaAuthorizationUrl',
    PROFILE = '/profile',
    LOGIN = '/login',

    TAGS = '/tags',

    RESET_PASSWORD = 'profile/password/reset',
    UPDATE_PASSWORD = '/profile/password',
    NETWORK = '/network',
    // COURSES
    COURSES_WITH_REQUESTS = '/courses/requests',
    USER_COURSES = '/courses/my',
    COURSES = '/courses',
    COURSE_APPLY = 'courses/apply',
    CANCEL_COURSE_REQUEST = 'courses/unapply',
    UPDATE_REQUEST_STATUS = 'courses/status',

    // CERTIFICATES
    CERTIFICATE = 'certificate',
    CERTIFICATE_STATUS = 'certificate/status',
}
