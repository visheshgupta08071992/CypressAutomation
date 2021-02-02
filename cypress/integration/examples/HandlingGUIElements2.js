/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('verify checkboxes', function () {
        cy.visit("http://demo.automationtesting.in/Register.html")
        cy.get('#checkbox1').click().should('be.checked').and('have.value','Cricket')
        cy.get('#checkbox2').click().should('be.checked').and('have.value','Movies')
        cy.get('#checkbox3').click().should('be.checked').and('have.value','Hockey')

        cy.get('#checkbox1').uncheck().should('not.be.checked')
        cy.get('#checkbox2').uncheck().should('not.be.checked')
        cy.get('#checkbox3').uncheck().should('not.be.checked')

        cy.get('[type=\'checkbox\']').check(['Cricket','Hockey'])
    });

    it('Skills drop down', function () {
        cy.get('#Skills').select('Android').should('have.value','Android')
    });

    it('Languages MultiSelect', function () {
        let lang=['English','Japanese']
        cy.get('#msdd').click()
        for (let i=0;i<lang.length;i++){
            cy.get('.ui-corner-all').contains(lang[i]).click()
        }
    });

    it('Countries Dropdown', function () {
        cy.get('[role=\'combobox\']').click({force:true})
        cy.get('[type=\'search\']').type('India')
        cy.get('[type=\'search\']').type('{enter}')

    });
})
