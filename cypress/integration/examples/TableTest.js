/// <reference types="Cypress" />

describe('Web Table Scenarios',()=>{

    it('Table Tests', function () {
        cy.visit('http://testautomationpractice.blogspot.com/');

        //1. Check value presence anywhere in the table
        cy.get('table[name=\'BookTable\']').contains('td','Learn Selenium').should('be.visible')

        //2. Check value presence specific to row and column in the table

        cy.get('table[name=\'BookTable\']>tbody tr:nth-child(2) td:nth-child(3)').contains('Selenium').should('be.visible')

        //3.Check Values Based on Condition by iterating rows i.e check the bookname 'Master in Java' whose Author
        // is 'Amod'

        cy.get('table[name=\'BookTable\']  > tbody > tr> td:nth-child(2)').each((e,index,list) =>{
            let columnValue=e.text()
            if(columnValue.includes('Amod')){
                cy.get('table[name=\'BookTable\']  > tbody > tr> td:nth-child(1)').eq(index).then((bookName1) =>{
                    let bookName=bookName1.text()
                    expect(bookName).to.equal('Master In Java')
                })
            }
        })
    })

})
