/// <reference types="Cypress" />
import 'cypress-iframe'
describe('UI Elements',()=>{

    it('Handling Frames', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe')
        cy.iframe().contains('Home').click()

    });
})

