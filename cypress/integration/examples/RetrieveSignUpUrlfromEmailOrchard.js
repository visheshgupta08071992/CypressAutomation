/// <reference types="Cypress" />

//import * as Jsoup from "cypress";

describe('UI Elements',()=>{

    let data
    var uuid = require("uuid");
    var id = uuid.v4();
    const userNameRegex=/Username:(\W)([^\s]+)/g;
    const passwordRegex=/Password:(\W)([^\s]+)/g;
    //2. Generate a unique email address for this test
    let testEmail
    let credsMail="f0ef0a71-1d43-44e3-b053-6cb59307700b}@2f614kke.mailosaur.net"
    before(() =>{
        cy.fixture('example').then((fileData) => {
            data=fileData
        })
    });

    it('Makes a Password Reset requestl', function () {
        //1.Provide you Mailsour Account API key and Server Name


        //2. Generate a unique email address for this test
        testEmail = `${id}@${data.server}.mailosaur.net`

        //3. **Your automation code that triggers an email to `emailAddress`**
       // cy.visit("https://networkacme.test.devappdirect.me/signup")
        cy.visit("https://od-fktjethjv.od26.appdirectondemand.com/signup")
        cy.get('input[type=\'email\']').type(testEmail)
      //  cy.log(testEmail)
        cy.get('button[type=\'submit\']').click()
        })

    it('Get Singup Link email and signup to MarketPlace', () => {
        cy.mailosaurGetMessage(data.server, {
            sentTo: testEmail
        }).then(email => {
            expect(email.subject).to.equal('Please verify your email address for AppDirect');
            let signUpLink = email.html.links[0].href
            cy.log(signUpLink)
            cy.visit(signUpLink)
            let input="Test@12345";
            cy.get('input[name=\'firstName\']').type(input)
            cy.get('input[name=\'lastName\']').type(input)
            cy.get('.password').type(input)
            cy.get('.confirm-password').type(input)
            cy.get('.phone-number').type(input)
            cy.get('#termsAndConditions').click()
            cy.get('#idd').click()
        })
    })

    it('Retrieve Username and Password', () => {

      var message='Hi, VisheshKumar. Welcome to G Suite from APPDIRECT. Please save this email for future reference.Your credentials for your administer Google Apps for goog-test.b73220211.appdirect.com.iaasprov.in are:Username: vishesh@goog-test.b73220211.appdirect.com.iaasprov.inPassword: da24v0ikrn4476aa4bdsqrk0kl To complete the set up of your Google Apps account you\'\'ll need to do the following steps: 1. Go to admin.google.com, and then click the Google Apps for Business application tile.2. Accept a G Suite reseller agreement.3. Accept the G Suite for Work by Resellers terms of service.4. Verify that you own goog-test.b73220211.appdirect.com.iaasprov.in by clicking through the start the setup guide. Respond to Google’s prompts to complete the verification process.5. Enable Email set up through the setup process Thanks! APPDIRECT\n'

        const UserEmail = message.match(userNameRegex).toString().split(':')[1].split('Password')[0];
        const password = message.match(passwordRegex).toString().split(':')[1]
        cy.log('UserEmail is ',UserEmail)
        cy.log('password is ',password)

    })


   /* it('Retrieve Credentials from MarketPlace', () => {

        cy.mailosaurGetMessage(data.server,{
            subject:'Welcome to your G Suite admin account'}).then((message) => {
         //  cy.log('Message Body:', message.html.body);
            const $body = Cypress.$(message.html.body)
            cy.log(($body).text())
            var emailBody=($body).text()
            const Username = emailBody.match(regex);
            cy.log('UserName is ',Username)
            // const buttonText = $body.find('#mailcontainer > div > p:nth-child(2)').text()
            // cy.log(buttonText)
        });

    })*/
    });



