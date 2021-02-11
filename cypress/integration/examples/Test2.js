/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Check No Of Elements Displayed after searching specific text', function () {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('[type=\'search\']').type('ca')
        //Click on Add to Cart for Second Button Vegetable
        cy.get('.products').find('.product').eq(2).contains("ADD TO CART").click()
        cy.get('[alt=\'Cart\']').click()
      cy.contains('PROCEED TO CHECKOUT').click()
    });
})

