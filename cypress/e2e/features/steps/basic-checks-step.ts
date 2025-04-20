import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../support/LoginPage/LoginPage";
import { HomePage } from "../../../support/HomePage/HomePage";


const loginPage = new LoginPage();
const homePage = new HomePage();


Given('I visit the home page sanity-steps', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
    homePage.verifyBannerPagina(); // verifica que la página cargó bien
});


//----1)Logeo con credenciales validas 

When("I click the 'Register-Login' button sanity-steps", () => {
    loginPage.clickSignupLogin(); //click en el boton de signup login
});

Then('I fill valid login credentials sanity-steps', () => {
    cy.UserLogin();
    loginPage.clickLoginButton();
});

Then('I should see the user logged in sanity-steps', () => {
    cy.verifyLoginAccountVisibleUserExist();// aca verifico que el nombre de usuario este en el homepage
});


