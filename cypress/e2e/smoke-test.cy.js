describe('Homepage Smoke Test', () => {
    beforeEach(() => {
        cy.visit('https://dev.alumni-portal.innopolis.university/auth')
    })

    it('checks text in navbar and login section', () => {
        cy.get('.Alumni-logo').should('exist')
        cy.contains('or login with').should('exist')
    })
})
