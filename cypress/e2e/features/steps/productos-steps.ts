import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../support/HomePage/HomePage";
import { ProductPage } from "../../../support/ProductPage/ProductPage";

const homePage = new HomePage();
const productPage = new ProductPage();

Given('que visito la página principal', () => {
  cy.visit('/');
  homePage.verifyBannerPagina(); // o el método que tengas para verificar home
});

When('hago clic en el botón de productos', () => {
  productPage.clickProductsButton();
});

Then('debería ser redirigido a la página de todos los productos', () => {
  productPage.verifyAllProductsPageVisible();
});

Then('debería ver la lista de productos', () => {
  productPage.productListVisible();
});

When("hago clic en 'Ver producto' del primer producto", () => {
  productPage.clickfirstProduct();
});

Then('debería ser redirigido a la página de detalle del producto', () => {
  productPage.verifyUserIsOnProductDetailPage();
});

Then('debería ver los detalles del producto como: nombre, categoría, precio, disponibilidad, condición y marca', () => {
  productPage.verifyProductDetails();
});
