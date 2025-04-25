import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../support/LoginPage/LoginPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { NavbarPage } from "../../../support/navbar/navbar";
import { CartPage } from "../../../support/CartPage/CartPage";


const loginPage = new LoginPage();
const homePage = new HomePage();
const navbarPage = new NavbarPage();
const cartPage = new CartPage();

Given('I visit the home page sanity-steps', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    homePage.verifyBannerPagina(); // verifica que la página cargó bien
});


//----1)Logeo con credenciales validas 

When("I click the 'Register-Login' button sanity-steps", () => {
    navbarPage.clickSignupLoginPage(); 
});

Then('I fill valid login credentials sanity-steps', () => {
    cy.UserLogin();
    loginPage.clickLoginButton();
});

Then('I should see the user logged in sanity-steps', () => {
    cy.verifyLoginAccountVisibleUserExist();
});

When('I navigate to the products page sanity-steps', () =>{
    navbarPage.clickProductPage(); 
})

When('I add a product to the cart',()=>{
    cy.clickAddToCartByProductIdPASS(1); 
});

    
Then('I should see the product in the cart',()=>{
    navbarPage.clickCartPage();
    cartPage.verifyProductInTheCart();
})


