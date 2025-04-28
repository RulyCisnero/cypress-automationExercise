import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../support/HomePage/HomePage";
import { ProductPage } from "../../../support/ProductPage/ProductPage";

const homePage = new HomePage();
const productPage = new ProductPage();

Given('I visit the main page', () => {
  cy.visit('/');
  homePage.verifyBannerPagina(); // o el método que tengas para verificar home
});

When('I click on the Products button -VFP', () => {
  productPage.clickProductsButton();
});

Then('I should be redirected to the All Products page', () => {
  productPage.verifyAllProductsPageVisible();
});

Then('I should see the list of products', () => {
  productPage.productListVisible();
});

When("I click on 'View Product' of the first product", () => {
  productPage.clickfirstProduct();
});

Then('I should be redirected to the Product Detail page', () => {
  productPage.verifyUserIsOnProductDetailPage();
});

Then('I should see the product details such as: name, category, price, availability, condition, and brand', () => {
  productPage.verifyProductDetails();
});
