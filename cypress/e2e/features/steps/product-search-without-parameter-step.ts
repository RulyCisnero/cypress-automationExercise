import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";

const productPage = new ProductPage();

Given("I visit the main page -CN", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
});

When("I click on the Products button -CN", () => {
    productPage.clickProductsButton();
});

When("I make a POST request to the search API without the 'search_product' parameter", () => {
    productPage.verifyAllProductsPageVisible();
    productPage.productListVisible();
    productPage.clickSearchButton();
});

Then("the response should return a 400 error with a message indicating the 'search_product' parameter is missing", () => {
    cy.SearchProductWithoutParameter();
});
