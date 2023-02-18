import * as selectors from "./selectors.js";
import * as credentials from "./testing-credentials.js";
import * as messages from "./expected-messages.js";
import * as buttonsContent from "./buttons-content";

const baseUrl = 'https://dev.alumni-portal.innopolis.university/auth';

describe('Authentication (Email and Password) Tests', () => {

    beforeEach(() => {
        cy.visit(baseUrl);
    })

    const isLoggedIn = () => {
        return cy.contains(buttonsContent.logout).should('exist')
    }

    const goToSignup = () => {
        return cy.contains(buttonsContent.goToSignUp).click();
    }

    it('signs up with test email', () => {
        goToSignup()

        cy.get(selectors.emailField).type(credentials.testEmail)
        cy.get(selectors.passwordField).type(credentials.testPassword)
        cy.get(selectors.passwordConfirmationField).type(credentials.testPassword)

        cy.contains(buttonsContent.signUp).click()

        isLoggedIn()
    })

    it('logs in with test email', () => {
        cy.get(selectors.emailField).type(credentials.testEmail)
        cy.get(selectors.passwordField).type(credentials.testPassword)

        cy.contains(buttonsContent.login).click()

        isLoggedIn()
    })

    it('attempts login with non-existing account', () => {
        cy.get(selectors.emailField).type(credentials.nonExistingEmail)
        cy.get(selectors.passwordField).type(credentials.testPassword)

        cy.contains(buttonsContent.login).click()

        cy.contains(messages.requestFailed500).should('exist')
    })

    it('attempts login with invalid email', () => {
        cy.get(selectors.emailField).type(credentials.invalidEmail)
        cy.get(selectors.passwordField).type(credentials.testPassword)

        cy.contains(buttonsContent.login).click()

        cy.contains(messages.invalidEmailWarning).should('exist')
    })

    it('attempts login with invalid password', () => {
        cy.get(selectors.emailField).type(credentials.testEmail)
        cy.get(selectors.passwordField).type(credentials.invalidPassword)

        cy.contains(buttonsContent.login).click()

        cy.contains(messages.invalidPasswordWarning).should('exist')
    })

    it('attempts signup with invalid email', () => {

        goToSignup()

        cy.get(selectors.emailField).type(credentials.invalidEmail)
        cy.get(selectors.passwordField).type(credentials.testPassword)
        cy.get(selectors.passwordConfirmationField).type(credentials.testPassword)

        cy.contains(buttonsContent.signUp).click()

        cy.contains(messages.invalidEmailWarning).should('exist')
    })

    it('attempts signup with invalid password', () => {

        goToSignup()

        cy.get(selectors.emailField).type(credentials.testEmail)
        cy.get(selectors.passwordField).type(credentials.invalidPassword)
        cy.get(selectors.passwordConfirmationField).type(credentials.invalidPassword)

        cy.contains(buttonsContent.signUp).click()

        cy.contains(messages.invalidPasswordWarning).should('exist')
    })
})