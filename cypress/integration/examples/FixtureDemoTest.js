/// <reference types="Cypress" />


describe('UI Elements',()=>{
    let data
   before(() =>{
       cy.fixture('example').then((fileData) => {
            data=fileData
       })
   });

    it('Fixture Demo', function () {

        cy.visit('https://admin-demo.nopcommerce.com')
        cy.get('.email').clear()
        cy.get('.email').type(data.email)
        cy.get('.password').type(data.password)
        cy.log(data.email)
        cy.log(data.password)
        cy.get('input[type=\'submit\']').click()

    });

})
