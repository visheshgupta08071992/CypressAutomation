/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('verify input box and radio buttons', function () {
        cy.visit("http://demo.guru99.com/test/newtours/")
        cy.url().should('include','newtours')
        cy.get('[name=\'userName\']').should('be.visible').should('be.enabled').type('mercury')
        cy.get('[name=\'password\']').should('be.visible').should('be.enabled').type('mercury')
        cy.get('[name=\'submit\']').should('be.visible').should('be.enabled').click()
        cy.title().should('eq','Login: Mercury Tours')
        cy.get('tr.mouseOut:nth-child(2) > td:nth-child(2) > a').click()
        cy.get('[value=\'roundtrip\']').should('be.visible').should('be.checked')
        cy.get('[value=\'oneway\']').should('be.visible').should('not.be.checked').click()
        cy.get('[name=\'findFlights\']').should('be.visible').click()
        cy.title().should('eq','Find a Flight: Mercury Tours:')
    });

})
