/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Check No Of Elements Displayed after searching specific text', function () {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('[type=\'search\']').type('ca')
        cy.get('.product-action >button').should('have.length',4)
        //Parent Child Chaining
        cy.get('.products').find('.product').should('have.length',4)
        //Click on Add to Cart for Second Button Vegetable
        cy.get('.products').find('.product').eq(2).contains("ADD TO CART").click()
        cy.get('.products').find('.product').find('.product-name').each((value,index,list) =>{
            let productName=value.text()
            if(productName.includes('Carrot')){
                cy.get('.products').find('.product').eq(index).contains("ADD TO CART").click()
            }

        })
    });
})

