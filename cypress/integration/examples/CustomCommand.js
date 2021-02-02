/// <reference types="Cypress" />

describe('CustomCommands',()=>{

    let data
    before(() =>{
        cy.fixture('example').then((fileData) => {
            data=fileData
        })
    });

    it('LoginTest', function () {
       cy.login(data.email,data.password)
        cy.title().should('be.equal','Your store. Login')
    });
});
