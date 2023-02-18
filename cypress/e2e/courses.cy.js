import * as selectors from "./selectors.js";
import * as buttonsContent from "./buttons-content";
import * as validationMessage from "./validationMessages";

const TEST_ADMIN_EMAIL = Cypress.env('test_admin_email');
const TEST_ADMIN_PASSWORD = Cypress.env('test_admin_password');

const BASE_PAGE_URL = 'https://dev.alumni-portal.innopolis.university/';

const NEW_COURSE_NAME = "New Course";
const NEW_COURSE_DESCRIPTION = "New Course Description";
const NEW_COURSE_TEACHERS = "New Course Teachers{enter}";
const NEW_COURSE_SLOTS = "10";
const OLD_COURSE_DATE = "01/01/2000";

const AUTH_PAGE_PATH = "auth";
const COURSES_PAGE_PATH = "courses";

describe('Course Creation', () => {

    const visitPage = (pageUrl) => {
        cy.visit(BASE_PAGE_URL + pageUrl);
    }

    const visitCoursesPage = () => {
        visitPage(COURSES_PAGE_PATH);
    }

    const deleteAllCourse = () => {
        cy.get(selectors.deleteCourseButtons).click({ multiple: true }) // multiple: true, for clicking all such (delete course) buttons
    }

    beforeEach(() => {
        visitPage(AUTH_PAGE_PATH)
        cy.get(selectors.emailField).type(TEST_ADMIN_EMAIL)
        cy.get(selectors.passwordField).type(TEST_ADMIN_PASSWORD)

        cy.contains(buttonsContent.login).click()

        cy.contains(buttonsContent.logout).should('exist')
    })

    it('creates a new course', () => {
        visitCoursesPage()
        cy.contains(buttonsContent.addNewCourse).click()
        cy.get(selectors.newCourseNameField).type(NEW_COURSE_NAME)
        cy.get(selectors.newCourseDescriptionField).type(NEW_COURSE_DESCRIPTION)
        cy.get(selectors.newCourseTeachersField).type(NEW_COURSE_TEACHERS)

        cy.get(selectors.newCourseSlotsField).type(NEW_COURSE_SLOTS)
        cy.contains(buttonsContent.addCourseSubmit).click()
        cy.contains(NEW_COURSE_NAME)
    })

    it('deletes all courses', () => {
        visitCoursesPage()
        cy.contains(NEW_COURSE_NAME)
        deleteAllCourse()
        visitCoursesPage()
        cy.contains(buttonsContent.addNewCourse)
        cy.contains(buttonsContent.deleteCourse).should('not.exist')
    })

    const checkFieldValidation = (validationMessage, correctingAction) => {
        visitCoursesPage()
        cy.contains(buttonsContent.addNewCourse).click()
        cy.contains(buttonsContent.addCourseSubmit).click()

        cy.contains(validationMessage)
        correctingAction();

        cy.contains(buttonsContent.addCourseSubmit).click()
        cy.contains(validationMessage).should('not.exist')
    }

    it('checks course without name is invalid', () => {
        checkFieldValidation(validationMessage.courseName, () => {
            cy.get(selectors.newCourseNameField).type(NEW_COURSE_DESCRIPTION)
        })
    })

    it('checks course without description is invalid', () => {
        checkFieldValidation(validationMessage.courseDescription, () => {
            cy.get(selectors.newCourseDescriptionField).type(NEW_COURSE_DESCRIPTION)
        })
    })

    it('checks course without slots is invalid', () => {
        checkFieldValidation(validationMessage.courseSlots, () => {
            cy.get(selectors.newCourseSlotsField).type(NEW_COURSE_SLOTS)
        })
    })

    it('checks course without teachers is invalid', () => {
        checkFieldValidation(validationMessage.courseTeachers, () => {
            cy.get(selectors.newCourseTeachersField).type(NEW_COURSE_TEACHERS)
        })
    })

    it('checks course start date can not be before today', () => {
        visitCoursesPage()
        cy.contains(buttonsContent.addNewCourse).click()
        cy.get(selectors.courseDateField).first().clear()
        cy.get(selectors.courseDateField).first().type(OLD_COURSE_DATE)
        cy.contains(buttonsContent.addCourseSubmit).click()
        cy.contains(validationMessage.courseStartDate).should('exist')
    })

    it('checks course end date can not be before start date', () => {
        visitCoursesPage()
        cy.contains(buttonsContent.addNewCourse).click()
        cy.get(selectors.courseDateField).eq(1).clear()
        cy.get(selectors.courseDateField).eq(1).type(OLD_COURSE_DATE)
        cy.contains(buttonsContent.addCourseSubmit).click()
        cy.contains(validationMessage.courseEndDate)
    })

})