import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { HomePage } from "../../../support/HomePage/HomePage";

const productPage = new ProductPage();
const homePage = new HomePage();

let cantidadSeleccionada: string;
//-vp (Verificar Producto)
Given("I visit the homepage -VP", () => {
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("I click on 'View Product' for a product", () => {
  productPage.clickViewProductButton(4); // o cualquier índice
});

Then("I should see the product details", () => {
  productPage.verifyProductDetails2();
});

When("I increase the quantity to {int}", (cantidad: number) => {
  cantidadSeleccionada = productPage.addQuantity(cantidad.toString());
});

When("I click on the 'Add to Cart' button and get redirected to the cart", () => {
  productPage.clickaddToCart();
});

Then("I should see the product with the correct quantity in the cart", () => {
  productPage.verifyQuantityInCart(cantidadSeleccionada);
});
