/// <reference types="Cypress" />

import {loginPageAction} from '../PageObjectsAndActions/LoginPageAction'

describe('UI Elements',()=>{

    let data
    before(() =>{
        cy.fixture('example').then((fileData) => {
            data=fileData
        })
    });

    it('PageObjectDemo', function () {
        loginPageAction.login(data.url,data.email,data.password)
    });
})
