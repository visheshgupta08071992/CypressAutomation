/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//import * as Jsoup from "cypress";

import 'cypress-iframe'

describe('UI Elements',()=>{

    let data
    var uuid = require("uuid");
    var id = uuid.v4();
    var max=100000
    var UserEmail
    var password
    var urlGoogle1

    var domain=`goog-test.b7${Math.floor(Math.random() * (max + 1))}.appdirect.com.iaasprov.in`
    const userNameRegex=/Username:(\W)([^\s]+)/g;
    const passwordRegex=/Password:(\W)([^\s]+)/g;
    const signUpLinkRegex=/https:(\W)(\W)([^\s]+)/g;
    //2. Generate a unique email address for this test
    let testEmail
    let credsMail="f0ef0a71-1d43-44e3-b053-6cb59307700b}@2f614kke.mailosaur.net"
    before(() =>{
        cy.fixture('example').then((fileData) => {
            data=fileData
        })
    });

    const FAILED_TESTS = {};
// Skip test if first test from folder failed
    beforeEach(function() {
        if (FAILED_TESTS[this.currentTest.file]) {
            this.skip();
        }
    });

    afterEach(function() {
        if (this.currentTest.state === "failed") {
            FAILED_TESTS[this.currentTest.file] = true;
        }
    });

    it('Makes a Password Reset requestl', function () {

        //1. Generate a unique email address for this test
        testEmail = `${id}@${data.server}.mailosaur.net`
        cy.log(testEmail)
        cy.log(domain)

        //3. **Your automation code that triggers an email to `emailAddress`**
        cy.visit(Cypress.env('Orchard_URL'))
        cy.get('input[type=\'email\']').type(testEmail)
        cy.get('button[type=\'submit\']').click()
        })

    it('Get Singup Link email and signup to MarketPlace', () => {
        cy.mailosaurGetMessage(data.server, {
            sentTo: testEmail
        }).then(email => {

            expect(email.subject).to.equal('Please verify your email address for AppDirect');
            const $body = Cypress.$(email.html.body)
            cy.log(($body).text())
            var emailBody=($body).text()
            const signUpLink = emailBody.match(signUpLinkRegex).toString()
            cy.log(signUpLink)
            cy.visit(signUpLink)
            let input="Test@12345";
            cy.get('input[name=\'firstName\']').type(input)
            cy.get('input[name=\'lastName\']').type(input)
            cy.get('.password').type(input)
            cy.get('.confirm-password').type(input)
            cy.get('.phone-number').type(input)
            cy.get('#termsAndConditions').click()
            cy.get('#id4').click()

        })
    })

    it('Search Gsuite Product',  () => {
        cy.get('[type=\'search\']',{timedOut:80000}).should('be.visible').type(data.GSuite)
        cy.get('.search_field').click()
        cy.get('.listing-row-content-title').eq(0).then((title) =>{
            expect(title.text()).to.equal(data.GSuite)
        })

    })

    it('Buy Gsuite Product',  () => {
        //Select GSuite Product
        cy.get('.listing-row-content-title',{timedOut:60000}).should('be.visible').eq(0).click()
        //Click on Buy Now Button
        //Clicking on Reload as Buy Now button is not loaded
        cy.reload()
        cy.get('.js-header-action-toolbar [type=\'button\'][aria-label=\'purchase\']').should('be.visible').click({force:true})
        if(cy.get('[name=\'email\']').should('be.visible')){
            cy.get('[aria-label="login"]').click()
            cy.get('input[name=\'email\']').type(testEmail)
            cy.get('input[type=\'password\']').type('Test@12345')
            cy.get('button[aria-label=\'login\']').click()
        }
        cy.get('.js-header-action-toolbar [type=\'button\'][aria-label=\'purchase\']').should('be.visible').click({force:true})
        //Create Order Page,Select Edition and click on COntinue
        cy.get('[role=\'radiogroup\'] .editionRow label',{timedOut:100000}).contains(data.EditionGSuiteBasicFlexible).should('be.visible').click({force:true})
        cy.contains('Continue').should('be.visible').click()

        //Additional Information Page
        cy.get('[name=\'domainName\']',{timedOut:70000}).should('be.visible').type(domain)
        cy.get('[name=\'userName\']').should('be.visible').type('Vishesh')
        cy.get('[name=\'alternateEmailAddress\']').should('be.visible').type('vishesh.gupta@appdirect.com')
        cy.get('[name=\'address\']').should('be.visible').type('50 Grove St')
        cy.get('[name=\'city\']').should('be.visible').type('Somerville')
        cy.get('.address-zip').should('be.visible').type('02144')
        cy.get('[name=\'americanState\']').select('MA').should('have.value','MA')
        cy.get('[aria-label=\'continue\']').should('be.visible').click()

        //Billing Details Page
        cy.get('#phone-number',{timedOut:900000}).should('be.visible').type('6503212121')
        cy.get('[name=\'creditCardDetailsPanel:addressInputContainer:addressBorder:addressBorder_body:address\']').should('be.visible').type('50 Grove St')
        cy.get('#city').should('be.visible').type('Somerville')
        cy.get('[data-auto=\'creditCardDetailsPanel:addressInputContainer:stateBorder:stateBorder_body:statePanel:state\']').select('MA').should('have.value','MA')
        cy.get('#postal-code').should('be.visible').type('02144')

        //Enter Credit Card Details
        cy.get('#name').should('be.visible').type('test user')
        cy.get('#credit-card-no').should('be.visible').type('4111111111111111')
        cy.get('#expiration-month').select('12').should('have.value','12')
        cy.get('#expiration-year').select('2036').should('have.value','2036')
        cy.get('#securityCode').should('be.visible').type('123')
        cy.get('#continue').should('be.visible').click()

        //Confirm Order Page
        cy.get('[type=\'checkbox\']',{timedOut:80000}).should('be.visible').click()
        cy.get('#placeOrder').should('be.visible').click()

        //Order Receipt Page
        cy.get('#return',{timedOut:80000}).should('be.visible').click()

        //My Apps Page
        cy.get('div .js-content div').should('be.visible').then((confirmationMessage) =>{
            expect(confirmationMessage.text()).to.equal('Your order request for G Suite - Multi Homing is being processed.  Once complete, you will be able to use your product from here. You will receive email confirmations of your purchase.')
        })

    })

    it('Retrieve Credentials from MarketPlace', () => {

        cy.mailosaurGetMessage(data.server,{
            //It would wait for 6 minutes for the mail to arrive
            subject:'Welcome to your G Suite admin account',
            sentTo: testEmail},{timeout:360000}).then((message) => {
            //  cy.log('Message Body:', message.html.body);
            const $body = Cypress.$(message.html.body)
            cy.log(($body).text())
            var emailBody=($body).text()
            UserEmail = emailBody.match(userNameRegex).toString().split(':')[1].split('Password')[0];
            password = emailBody.match(passwordRegex).toString().split(':')[1]
            cy.log(UserEmail)
            cy.log(password)
            // const buttonText = $body.find('#mailcontainer > div > p:nth-child(2)').text()
            // cy.log(buttonText)

            //Login to Google Console using the bought subscription credentials
            //Waiting for a minute so that Google Account is created
            cy.wait(60000)
            cy.log(Cypress.env("Google_URL") + `${UserEmail}`)
            let Google_URL=Cypress.env("Google_URL") + `${UserEmail}`
            cy.visit(Google_URL)
            cy.log(`${UserEmail}`)
            cy.log(`${password}`)
            cy.get('[type=\'email\']').should('be.visible').clear().then(() =>{
                cy.get('[type=\'email\']').type(`${UserEmail}`)
            })
            cy.get('#identifierNext').should('be.visible').click()
            cy.get('[type=\'password\']',{timedOut:70000}).should('be.visible')
            cy.get('[name=\'password\']').type(`${password}`)
            cy.get('#passwordNext > div > button').should('be.visible').click()
            cy.get('[type=\'submit\']').should('be.visible').click()
            cy.pause()
            cy.url().then( function(url) {
                cy.wrap(url).as('urlGoogle');
            })

            cy.pause()
            cy.visit('@urlGoogle')
           // Cypress.config('chromeWebSecurity',false)
            // cy.frameLoaded('#I0_1613547768085')
            // cy.frameLoaded('#I1_1613547768091')

           cy.contains('Accept Terms of Service').should('be.visible').click()
        });

    })

    it('Login to Google Console using the bought subscription credentials', () => {
        cy.visit('@urlGoogle')
        cy.contains('Accept Terms of Service').should('be.visible').click()


    })


    // it('Retrieve Username and Password', () => {
    //
    //   var message='Hi, VisheshKumar. Welcome to G Suite from APPDIRECT. Please save this email for future reference.Your credentials for your administer Google Apps for goog-test.b73220211.appdirect.com.iaasprov.in are:Username: vishesh@goog-test.b73220211.appdirect.com.iaasprov.inPassword: da24v0ikrn4476aa4bdsqrk0kl To complete the set up of your Google Apps account you\'\'ll need to do the following steps: 1. Go to admin.google.com, and then click the Google Apps for Business application tile.2. Accept a G Suite reseller agreement.3. Accept the G Suite for Work by Resellers terms of service.4. Verify that you own goog-test.b73220211.appdirect.com.iaasprov.in by clicking through the start the setup guide. Respond to Google’s prompts to complete the verification process.5. Enable Email set up through the setup process Thanks! APPDIRECT\n'
    //
    //     const UserEmail = message.match(userNameRegex).toString().split(':')[1].split('Password')[0];
    //     const password = message.match(passwordRegex).toString().split(':')[1]
    //     cy.log('UserEmail is ',UserEmail)
    //     cy.log('password is ',password)
    //
    // })

    });



