import { TestCasesPage } from "../../support/TestCasesPage/TestCasesPage";
import { HomePage } from "../../support/HomePage/HomePage";
import { LoginPage } from "../../support/LoginPage/LoginPage";
import { ContactPage } from "../../support/ContactPage/ContactPage";

const homePage = new HomePage();
const loginPage = new LoginPage();
const testCasesPage = new TestCasesPage();
const contactPage = new ContactPage();

describe('Test Cases parte 1', () => {
  beforeEach('visitando la pagina', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(2000)
    homePage.verifyBannerPagina();

  })
  it("Test Case 1: Register User", () => {
    loginPage.clickSignupLogin();//click en el boton de signup login
    cy.deleteUserIfExists();//verifica si existe el usuario y lo elimina por API
    cy.fillUserForm();//completa el formulario de signup
    loginPage.clickCreateAccount();
    loginPage.dismissRememberpassword();
    cy.VerifyLoginApi();//verifica el login por API
    loginPage.verifyAccountCreated();
    loginPage.clickContinueButton();
    cy.verifyLoginAccountVisible();//verifica que el nombre de usuario esté visible
    //cy.getUserDetailsByEmail('test@test.com'); //REVISAR NO ANDA.
    loginPage.clickDeleteAccount();
    loginPage.verifyDeleteAccountInfo();
    //cy.deleteUserWithAPI();//si elimino desde click no hace falta eliminar por API
  });

  it("creo el usuario, usando Api y lo elimino ", () => {
    cy.log("Eliminando usuario si existe...");
    cy.deleteUserIfExists();//verifica si existe el usuario y lo elimina por API
    cy.log("Registrando usuario con API...");
    cy.registerUserWithAPI();//registra el usuario por API
    cy.log("Verificando el login por API...");
    cy.VerifyLoginApi();//verifica el login por API
    cy.log("Eliminando usuario con API...");
    cy.deleteUserWithAPI();//elimina el usuario por API
  });

  it("Test Case 2: Login User with correct email and password", () => {
    loginPage.clickSignupLogin();
    cy.UserLogin();
    loginPage.clickLoginButton();
    cy.verifyLoginAccountVisibleUserExist();// aca verifico que el nombre de usuario este en el homepage
    //loginPage.clickDeleteAccount(); // comentado por que no quierlo eliminar la cuenta de prdrito
    //loginPage.verifyDeleteAccountInfo();
    //loginPage.clickContinueButton();
  });


  it("Test Case 3: Login User with incorrect email and password + API", () => {
    loginPage.clickSignupLogin();
    cy.UserLoginCredencialesInvalidas();
    cy.verifyLoginInvalidAPI();
    loginPage.clickLoginButton();
    loginPage.verifyErrorMsj();
  });

  it("Test Case 4: Login User with out email parameter + API", () => {
    loginPage.clickSignupLogin();
    cy.wait(1000);
    cy.UserLoginSinEmailParametro();
    loginPage.clickLoginButton();
  });

  it('Test Case 4: Logout User', () => {
    loginPage.clickSignupLogin();//click en el boton de signup login
    loginPage.verifyLoginAccountVisible();//verifica que  'Login to your account' is visible
    cy.UserLogin();// logeo con credenciales validas
    loginPage.clickLoginButton();//click boton login
    cy.verifyLoginAccountVisibleUserExist();//verifica que el nombre del usuario "EXISTENTE" este en homepage
    loginPage.clickLogOutButton();//click en el boton de logout
  });


  it("Test Case 6: Contact Us Form + API", () => {
    contactPage.clickContactUsButton();
    cy.wait(2000);
    contactPage.verifyContactUsVisible();
    cy.fillContactUsForm();
    contactPage.clickSubmitButton();
    contactPage.verifyMessageSuccess();
    contactPage.clickButtonHome();
  });

  it("Test Case 7: Verify Test Cases Page", () => {
    testCasesPage.clickTestCasePageButton();
    testCasesPage.allTitlesTestCases();
  });


});
