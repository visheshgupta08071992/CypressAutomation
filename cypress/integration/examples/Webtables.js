/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('Webtables', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        //From Webtable get price of course 'Master Selenium Automation in simple Python Language'
       cy.get('fieldset:nth-child(1) > #product > tbody>tr>td:nth-child(2)').each((value,index,list) =>{
          let courseName=value.text()
           if(courseName=='Master Selenium Automation in simple Python Language'){
               cy.get('fieldset:nth-child(1) > #product > tbody>tr>td:nth-child(3)').eq(index).then((price) =>{
                   let courseValue=price.text()
                   expect(courseValue).to.equal('25')
               })
           }
       })
    });
})

