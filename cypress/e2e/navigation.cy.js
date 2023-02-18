import * as selectors from "./selectors.js";
import * as credentials from "./testing-credentials.js";
import * as buttonsContent from "./buttons-content";

const TEST_EMAIL = Cypress.env('test_email');

const BASE_PAGE_URL = 'https://dev.alumni-portal.innopolis.university/';

const NETWORK_PAGE_TEXT = "Network will be added soon, stay tuned";
const DONATIONS_PAGE_TEXT = "Donations will be added soon, stay tuned";
const BOOKS_PAGE_TEXT = "Books will be added soon, stay tuned";
const PASS_PAGE_TEXT = "Pass will be added soon, stay tuned";
const CERTIFICATES_PAGE_TEXT = "Certificates will be added soon, stay tuned";

const HOMEPAGE_PATH = "";
const AUTH_PAGE_PATH = "auth";
const NETWORK_PAGE_PATH = "network";
const DONATIONS_PAGE_PATH = "donations";
const BOOKS_PAGE_PATH = "books";
const PASS_PAGE_PATH = "pass";
const CERTIFICATES_PAGE_PATH = "certificates";
const PROFILE_PAGE_PATH = "profile";
const REGISTER_PAGE_PATH = "register";
const COURSES_PAGE_PATH = "courses";

const HOMEPAGE_NETWORK_HEADER = "Network";
const HOMEPAGE_BOOKS_PAGE_DESCRIPTION = "Use the university library, save and read books";
const HOMEPAGE_PASS_PAGE_DESCRIPTION = "Get a pass to the university and come visit";

const REGISTER_PAGE_ALTERNATIVE_SIGNUP_PROMPT = "or sign up with";
const REGISTER_PAGE_SIGNUP_HEADER = "Sign up";

const AUTH_PAGE_LOGIN_HEADER = "Log in";
const AUTH_PAGE_ALTERNATIVE_LOGIN_PROMPT = "or login with";

const PROFILE_PAGE_HEADER = "Profile";
const PROFILE_PAGE_PERSONAL_INFORMATION_SECTION_HEADER = "Personal information";
const PROFILE_PAGE_CHANGE_PASSWORD_BUTTON_TEXT = "Change Password";
const PROFILE_PAGE_EDIT_INFORMATION_BUTTON_TEXT = "Edit information";

const COURSES_PAGE_ALL_COURSES_TAG = "All";
const COURSES_PAGE_ALL_COURSES_TAB_BUTTON_TEXT = "All Courses";
const COURSES_PAGE_MY_COURSES_TAB_BUTTON_TEXT = "My Courses";

describe('Navigation Routes', () => {

    const visitPage = (pageUrl) => {
        cy.visit(BASE_PAGE_URL + pageUrl);
    }

    beforeEach(() => {
        visitPage(AUTH_PAGE_PATH)
        cy.get(selectors.emailField).type(TEST_EMAIL)
        cy.get(selectors.passwordField).type(credentials.testPassword)

        cy.contains(buttonsContent.login).click()

        cy.contains(buttonsContent.logout).should('exist')
    })

    it('homepage page', () => {
        visitPage(HOMEPAGE_PATH)
        cy.contains(HOMEPAGE_NETWORK_HEADER).should('exist')
        cy.contains(HOMEPAGE_BOOKS_PAGE_DESCRIPTION).should('exist')
        cy.contains(HOMEPAGE_PASS_PAGE_DESCRIPTION).should('exist')
    })

    it('register (sign up) page', () => {
        visitPage(REGISTER_PAGE_PATH)
        cy.contains(REGISTER_PAGE_SIGNUP_HEADER).should('exist')
        cy.contains(REGISTER_PAGE_ALTERNATIVE_SIGNUP_PROMPT).should('exist')
    })

    it('auth (login) page', () => {
        visitPage(AUTH_PAGE_PATH)
        cy.contains(AUTH_PAGE_LOGIN_HEADER).should('exist')
        cy.contains(AUTH_PAGE_ALTERNATIVE_LOGIN_PROMPT).should('exist')
    })

    it('profile page', () => {
        visitPage(PROFILE_PAGE_PATH)
        cy.contains(PROFILE_PAGE_HEADER).should('exist')
        cy.contains(PROFILE_PAGE_PERSONAL_INFORMATION_SECTION_HEADER).should('exist')
        cy.contains(PROFILE_PAGE_CHANGE_PASSWORD_BUTTON_TEXT).should('exist')
        cy.contains(PROFILE_PAGE_EDIT_INFORMATION_BUTTON_TEXT).should('exist')
    })

    it('courses page', () => {
        visitPage(COURSES_PAGE_PATH)
        cy.contains(COURSES_PAGE_ALL_COURSES_TAB_BUTTON_TEXT).should('exist')
        cy.contains(COURSES_PAGE_MY_COURSES_TAB_BUTTON_TEXT).should('exist')
        cy.contains(COURSES_PAGE_ALL_COURSES_TAG).should('exist')
    })

    it('certificates page', () => {
        visitPage(CERTIFICATES_PAGE_PATH)
        cy.contains(CERTIFICATES_PAGE_TEXT).should('exist')
    })

    it('pass page', () => {
        visitPage(PASS_PAGE_PATH)
        cy.contains(PASS_PAGE_TEXT).should('exist')
    })

    it('books page', () => {
        visitPage(BOOKS_PAGE_PATH)
        cy.contains(BOOKS_PAGE_TEXT).should('exist')
    })

    it('donations page', () => {
        visitPage(DONATIONS_PAGE_PATH)
        cy.contains(DONATIONS_PAGE_TEXT).should('exist')
    })

    it('network page', () => {
        visitPage(NETWORK_PAGE_PATH)
        cy.contains(NETWORK_PAGE_TEXT).should('exist')
    })

})