import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";


const productPage = new ProductPage();


Given("I visit the main page -BP", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit("/");
});

When("I click on the Products button -BP", () => {
  productPage.clickProductsButton();
});

When('I enter {string} in the search field', (termino: string) => {
  productPage.verifyAllProductsPageVisible();
  productPage.productListVisible();
  productPage.searchProduct(termino);
});

When("I click on the search button", () => {
  productPage.clickSearchButton();
});

Then("I should see the searched product titles", () => {
  productPage.verifySearchedProductsTitle();
});

Then('the products related to {string} should be displayed',(termino:string) => {
  productPage.verifySearchResultsVisible();
  // verificacion por API UI 
   cy.verifySearchResultsMatchApi(termino);
});

