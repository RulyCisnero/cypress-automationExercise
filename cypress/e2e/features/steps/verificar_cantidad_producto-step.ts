import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { HomePage } from "../../../support/HomePage/HomePage";

const productPage = new ProductPage();
const homePage = new HomePage();

let cantidadSeleccionada: string;
//-vp (Verificar Producto)
Given("que visito la página de inicio -VP", () => {
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("hago clic en 'Ver producto' de un producto", () => {
  productPage.clickViewProductButton(4); // o cualquier índice
});

Then("debería ver los detalles del producto", () => {
  productPage.verifyProductDetails2();
});

When("aumento la cantidad a {int}", (cantidad: number) => {
  cantidadSeleccionada = productPage.addQuantity(cantidad.toString());
});

When("hago clic en el botón 'Agregar al carrito' y me redirecciona a carrito", () => {
  productPage.clickaddToCart();
});

Then("debería ver el producto con la cantidad correcta en el carrito", () => {
  productPage.verifyQuantityInCart(cantidadSeleccionada);
});
