describe('My Test Suite', () => {
    it('Verify Title of the page', () => {
       cy.visit('http://demo.nopcommerce.com/');
       cy.title().should('eq','nopCommerce demo store')
    })

    it('Verify Title of the page', () => {
        cy.visit('http://demo.nopcommerce.com/');
        cy.title().should('eq','nopCommerce dem store')
    })
})
