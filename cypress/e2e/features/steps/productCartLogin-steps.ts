import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { CartPage } from "../../../support/CartPage/CartPage";
import { LoginPage } from "../../../support/LoginPage/LoginPage";
import { SidebarPage } from "../../../support/HomePage/Sidebar";
import { NavbarPage } from "../../../support/navbar/navbar";

const productPage = new ProductPage();
const cartPage = new CartPage();
const sidebar = new SidebarPage();
const loginPage = new LoginPage();
const navbarPage = new NavbarPage();

Given('I visit the homepage for regression-test', () => {
  cy.visit('/');
});

When("I click the 'Products' button", () => {
  productPage.clickProductsButton();
});

Then('I should see the All Products page', () => {
  productPage.verifyAllProductsPageVisible();
});

When('I search for {string}', (productName: string) => {
  productPage.searchProduct(productName);
  productPage.clickSearchButton();
});

Then('I should see search results', () => {
  productPage.verifySearchResultsVisible();
});

When('I add all search results to the cart', () => {
  sidebar.addAllSearchResultsToCart();
});

When('I go to the Cart page', () => {
  navbarPage.clickCartPage();
});

Then('I should see at least one product in the cart', () => {
  cartPage.verifyProductInTheCart();
});

When("I click the 'Signup-Login' button", () => {
  navbarPage.clickSignupLoginPage();
});

When('I register a new user', () => {
  cy.deleteUserIfExists();
  cy.fillUserForm();
});

When('I go to the Cart page again', () => {
  navbarPage.clickCartPage();
});

Then('I should still see the product-s in the cart', () => {
  cartPage.verifyProductInTheCart();
});
