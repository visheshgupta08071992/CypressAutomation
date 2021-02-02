/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Alert function', function () {
        cy.visit("http://testautomationpractice.blogspot.com/")
        cy.get('[onclick=\'myFunction()\']').click()
        cy.on('window:confirm',(str) =>{
            expect(str).to.equal('Press a button!')
        })

    });

})
