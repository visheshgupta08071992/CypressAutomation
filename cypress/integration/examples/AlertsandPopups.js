/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Popups and New Tabs', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
       cy.get('#alertbtn').click()
       cy.on('window:alert',(alertMessage) =>{
           expect(alertMessage).to.equal('Hello , share this practice page and share your knowledge')
       })

        //Given code would open the page in the same tab
        cy.get('#opentab').invoke('removeAttr','target').click()
        //Go back to first page
        cy.go(-1)
    });
})

