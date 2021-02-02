/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Navigation Tests', function () {
        cy.visit('http://demo.nopcommerce.com/');
        cy.title().should('eq','nopCommerce demo store')
        cy.get('.ico-register').click()
        cy.title().should('eq','nopCommerce demo store. Register')
        cy.go(-1)
        cy.title().should('eq','nopCommerce demo store')
        cy.go(1)
        cy.title().should('eq','nopCommerce demo store. Register')
        cy.go('back')
        cy.title().should('eq','nopCommerce demo store')
        cy.go('forward')
        cy.title().should('eq','nopCommerce demo store. Register')
        })

})
