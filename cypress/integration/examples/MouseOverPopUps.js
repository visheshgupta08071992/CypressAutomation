/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Webtables', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('.mouse-hover .mouse-hover-content').invoke('show')
        cy.get('[href=\'#top\']').click()
        cy.url().should('include','#top')
    });
})

