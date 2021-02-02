/// <reference types="Cypress" />

export class LoginPage{

    email(){
        return cy.get('.email');
    }

    password(){
        return cy.get('.password')
    }

    submit(){
        return cy.get('input[type=\'submit\']')
    }

}

export const loginPage = new LoginPage();
