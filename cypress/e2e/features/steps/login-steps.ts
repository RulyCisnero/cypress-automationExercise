import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../support/LoginPage/LoginPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { NavbarPage } from "../../../support/navbar/navbar";

const loginPage = new LoginPage();
const homePage = new HomePage();
const navbarPage = new NavbarPage();

//----1)Crear usuario------//
Given('I visit the homepage login-steps1', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    homePage.verifyBannerPagina(); // verifica que la página cargó bien
});

When('I click on the login button login-steps1', () => {
    navbarPage.clickSignupLoginPage();
});

Then('I enter valid credentials login-steps1', () => {
    cy.UserLogin();
    loginPage.clickLoginButton();
});

Then('You should have logged in successfully, username appears on screen login-steps1', () => {
    cy.verifyLoginAccountVisibleUserExist();// aca verifico que el nombre de usuario este en el homepage
});

When('I enter invalid email and password login-steps2', () => {
    cy.UserLoginCredencialesInvalidas();
    cy.verifyLoginInvalidAPI();
    loginPage.clickLoginButton();
});

Then('I should see the error message login-steps2', () => {
    loginPage.verifyErrorMsj();
});

When("I try to login without entering an email login-steps3", () => {
    cy.UserLoginSinEmailParametro();
});


Then("I should see an error message about the missing email login-steps3", () => {
    cy.VerifyLoginWithOutEmailParameterAPI(); // tu verificación API
    loginPage.clickLoginButton(); // intenta enviar el formulario
});


