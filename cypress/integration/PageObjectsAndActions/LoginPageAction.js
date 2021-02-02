/// <reference types="Cypress" />

import {loginPage} from './LoginPage';
export class LoginPageAction{

   enterEmail(emailAddredss){
       loginPage.email().clear()
       loginPage.email().type(emailAddredss)
   }

   enterPassword(pass){
       loginPage.password().type(pass)
   }

   visit(url){
       cy.visit(url)
   }

   login(url,username,password){
       this.visit(url)
       this.enterEmail(username)
       this.enterPassword(password)
   }

}

export const loginPageAction=new LoginPageAction()
