import { HomePage } from "../../support/HomePage/HomePage";
import { LoginPage } from "../../support/LoginPage/LoginPage";
import { NavbarPage } from "../../support/navbar/navbar";

const homePage = new HomePage();
const loginPage = new LoginPage();
const navbarPage = new NavbarPage();


describe('Authentication Suite', () => {
    beforeEach('visitando la pagina', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
        homePage.verifyBannerPagina();
    })

    it("Register User", () => {
        navbarPage.clickSignupLoginPage();
        cy.deleteUserIfExists();//verifica si existe el usuario y lo elimina por API
        cy.fillUserForm();
        loginPage.clickCreateAccount();
        loginPage.dismissRememberpassword();
        cy.VerifyLoginApi();//verifica el login por API
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();
        cy.verifyLoginAccountVisible();
        //cy.getUserDetailsByEmail('test@test.com'); //REVISAR NO ANDA.
        loginPage.clickDeleteAccount();
        loginPage.verifyDeleteAccountInfo();
    });

    it("Login User with correct email and password", () => {
        navbarPage.clickSignupLoginPage();
        cy.UserLogin();
        loginPage.clickLoginButton();
        cy.verifyLoginAccountVisibleUserExist();
    });

    it("Login User with incorrect email and password + API", () => {
        navbarPage.clickSignupLoginPage();
        cy.UserLoginCredencialesInvalidas();
        cy.verifyLoginInvalidAPI();
        loginPage.clickLoginButton();
        loginPage.verifyErrorMsj();
    });

    it('Logout User', () => {
        navbarPage.clickSignupLoginPage();
        loginPage.verifyLoginAccountVisible();
        cy.UserLogin(); // logeo con credenciales validas
        loginPage.clickLoginButton();
        cy.verifyLoginAccountVisibleUserExist();
        loginPage.clickLogOutButton();
    });

    it("Login User with out email parameter + API", () => {
        navbarPage.clickSignupLoginPage();
        cy.UserLoginSinEmailParametro();
        loginPage.clickLoginButton();
    });

    it("created the user, using Api and deleted it ", () => {
        cy.log("Eliminando usuario si existe...");
        cy.deleteUserIfExists();//verifica si existe el usuario y lo elimina por API
        cy.log("Registrando usuario con API...");
        cy.registerUserWithAPI();//registra el usuario por API
        cy.log("Verificando el login por API...");
        cy.VerifyLoginApi();//verifica el login por API
        cy.log("Eliminando usuario con API...");
        cy.deleteUserWithAPI();//elimina el usuario por API
    });



}); 