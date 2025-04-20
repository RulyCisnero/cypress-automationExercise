import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../support/LoginPage/LoginPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { FooterPage } from "../../../support/FooterPage/FooterPage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const footerPage = new FooterPage();

Given('I visit the homepage', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
});

Then('I should see the main banner', () => {
    homePage.verifyBannerPagina(); // verifica banner de la pag
});


When('I write a valid email', () => {
    footerPage.scrollToFotter();
    cy.subscribeWithEmail();
});

Then('I click the subscribe button', () => {
    cy.log('este paso se saltea por que subscribeWithEmail tiene el boton click dentro ')
});

Then('I should see the success subscription message',()=>{
    footerPage.verifySubscriptionSuccessMessage();;
});


When("I click the 'Register-Login' button",()=>{
 loginPage.clickSignupLogin();
});
    
Then('I should see the login-signup form',()=>{
    loginPage.verifyNewUserSignupVisible();
    loginPage.verifyLoginAccountVisible();
});

