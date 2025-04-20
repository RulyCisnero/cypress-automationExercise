import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../support/LoginPage/LoginPage";
import { HomePage } from "../../../support/HomePage/HomePage";


const loginPage = new LoginPage();
const homePage = new HomePage();

//----1)Crear usuario------//
Given('I visit the homepage login-steps1', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
    homePage.verifyBannerPagina(); // verifica que la página cargó bien
});


//----1)Logeo con credenciales validas ANDA, PERO ELIMINA LAS CUENTAS LA PAGINA-----//

When('I click on the login button login-steps1', () => {
    loginPage.clickSignupLogin(); //click en el boton de signup login
});

Then('I enter valid credentials login-steps1', () => {
    cy.UserLogin();
    loginPage.clickLoginButton();
});

Then('You should have logged in successfully, username appears on screen login-steps1', () => {
    cy.verifyLoginAccountVisibleUserExist();// aca verifico que el nombre de usuario este en el homepage
});




//----2)Logeo con credenciales invalidas-----//
/* When('I click on the login button login-steps', () => {
    loginPage.clickSignupLogin();//click en el boton de signup login    
}); */

When('I enter invalid email and password login-steps2', () => {
    cy.UserLoginCredencialesInvalidas();
    cy.verifyLoginInvalidAPI();
    loginPage.clickLoginButton();
});

Then('I should see the error message login-steps2', () => {
    loginPage.verifyErrorMsj();
});

//-------------//
/* When("I click on the login button login-steps", () => {
    loginPage.clickSignupLogin();
  });
   
  When("I enter valid credentials", () => {
    cy.UserLoginSinEmailParametro();
  });
  */
  When("I try to login without entering an email login-steps3", () => {
    cy.UserLoginSinEmailParametro();
  });
  

  Then("I should see an error message about the missing email login-steps3", () => {
    cy.VerifyLoginWithOutEmailParameterAPI(); // tu verificación API
    loginPage.clickLoginButton(); // intenta enviar el formulario
  });


