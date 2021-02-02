/// <reference types="Cypress" />

describe('UI Elements',()=>{


    before(() =>{
        cy.log('In setup Method')
    });

    after(() =>{
        cy.log('Tear Down Method')
    });

    beforeEach(() =>{
        cy.log('Login')
    });

    afterEach(() =>{
        cy.log('Logout')
    });

    it('Searching', function () {
        cy.log('In seacrh')
    });

    it('Advance Searching', function () {
        cy.log('In Advance seacrh')
    });

});
