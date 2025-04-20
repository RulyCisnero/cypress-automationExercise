import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { CartPage } from "../../../support/CartPage/CartPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { LoginPage } from "../../../support/LoginPage/LoginPage";

const productPage = new ProductPage();
const cartPage = new CartPage();
const homePage = new HomePage();
const loginPage = new LoginPage();  

Given("I visit the home page TC-14", () => {
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("I add products to the cart", () => {
  productPage.clickViewProductButton(4);
  productPage.addQuantity("4");
  productPage.clickaddToCart(); // Redirige automáticamente al carrito
});

Then("I should see the cart page", () => {
  cy.url().should('include', '/view_cart');
  cy.contains('Shopping Cart').should('be.visible');
  cartPage.grillaDeProductosVisible();
});

When("I click 'Proceed To Checkout'", () => {
  cartPage.clickCheckoutButton();
});

When("I click the 'Register-Login' button modal", () => {
  cartPage.clickLoginButtonModal();
});

When("I complete the registration form and create the account", () => {
  cy.wait(2000);
  cy.deleteUserIfExists(); // Para evitar conflicto con usuarios previos
  cy.fillUserForm();
  loginPage.clickCreateAccount();
  cy.wait(1000);
});

Then('I should see the account created confirmation with API check', () => {
    cy.VerifyLoginApi();
    loginPage.verifyAccountCreated();
    loginPage.clickContinueButton();
});

Then("I should see 'Logged in as username'", () => {
  cy.verifyLoginAccountVisible(); // Incluye validación del nombre de usuario
});

When("I click the 'Cart' button", () => {
  cartPage.clickCartPage();
});

Then("I should see address details and order summary", () => {
  cartPage.verifyDetailsInformationVisible();
});

When("I write a comment for the order and click 'Place Order'", () => {
  cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
  cartPage.clickPlaceOrderButton();
});

When("I fill out payment details and confirm the order", () => {
  cy.fillCardDetails();
  cy.get('#submit').click();
});

Then("I should see the success message for the order", () => {
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
});

When("I click 'Delete Account'", () => {
  cy.get('a[href="/delete_account"]').click();
});

Then("I should see the message 'ACCOUNT DELETED!' and click 'Continue'", () => {
  cy.contains('Account Deleted!').should('be.visible');
  cy.get('a.btn.btn-primary').contains('Continue').click();
});
