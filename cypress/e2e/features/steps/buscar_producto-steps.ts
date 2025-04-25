import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { HomePage } from "../../../support/HomePage/HomePage";

const productPage = new ProductPage();
const homePage = new HomePage();

Given("que visito la página principal -BP", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit("/");
  cy.wait(1000);
});

When("hago clic en el botón de Productos", () => {
  productPage.clickProductsButton();
});

When("ingreso {string} en el campo de búsqueda", (termino: string) => {
  productPage.verifyAllProductsPageVisible();
  productPage.productListVisible();
  productPage.searchProduct(termino);
});

When("hago clic en el botón de buscar", () => {
  productPage.clickSearchButton();
});

Then("debería ver el título de productos buscados", () => {
  productPage.verifySearchedProductsTitle();
});

Then("deberían visualizarse los productos relacionados con la búsqueda de {string}",(termino:string) => {
  productPage.verifySearchResultsVisible();
  // verificacion por API UI 
   cy.verifySearchResultsMatchApi(termino);
});

