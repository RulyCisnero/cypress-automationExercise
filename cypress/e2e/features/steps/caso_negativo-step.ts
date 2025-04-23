import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { HomePage } from "../../../support/HomePage/HomePage";

const productPage = new ProductPage();
const homePage = new HomePage();

Given("que visito la página principal -CN", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(1000);
});

When("hago clic en el botón de Productos -CN", () => {
    productPage.clickProductsButton();
});

When("realizo una solicitud POST a la API de búsqueda sin pasar el parámetro 'search_product'", () => {
    productPage.verifyAllProductsPageVisible();
    productPage.productListVisible();
    productPage.clickSearchButton();
});

Then("la respuesta debe ser un error 400 con un mensaje indicando que el parámetro 'search_product' está ausente", () => {
    cy.SearchProductWithoutParameter();
    cy.wait(2000);
});
