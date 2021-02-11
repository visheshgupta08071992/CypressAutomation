/// <reference types="Cypress" />


describe('UI Elements',()=>{
    let data
   before(() =>{
       cy.fixture('example').then((fileData) => {
            data=fileData
       })
   });

    it('Fixture Demo', function () {

        cy.visit('https://www.rahulshettyacademy.com/angularpractice/')
        cy.get('.form-group [name=\'name\']').type(data.name)
    });

})
