/// <reference types="Cypress" />

describe('UI Elements',()=>{

    it('WebControls UI', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        //Click all checkboxes
        cy.get('[type=\'checkbox\']:visible').check(['option1','option2','option3'])

        //Handling Static dropdown having select tag
        cy.get('#dropdown-class-example').select('Option1').should('have.value','option1')

        //Handling Dynamic Dropdown
        cy.get('.inputs.ui-autocomplete-input').type('ind')
        cy.get('#ui-id-1 li div').each((value,index,list)=>{
            let country=value.text()
            if(country=='India'){
                cy.get('#ui-id-1 li div').eq(index).click()
            }

        })

        //Check Visibility and Invisibility of Element
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')

        //Click Radio Buttons
        cy.get('[type=\'radio\']').check(['radio1','radio2','radio3'])
    });
})

