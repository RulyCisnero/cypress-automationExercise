import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { CartPage } from "../../../support/CartPage/CartPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { ModalProductPage } from "../../../support/ProductPage/ModalProductPage";

const productPage = new ProductPage();
const cartPage = new CartPage();
const homePage = new HomePage();
const modal = new ModalProductPage();

Given("que visito la página de inicio para productos", () => {
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("hago clic en el botón de productos para productos", () => {
  productPage.clickProductsButton();
  cy.wait(2000);
});

When("agrego el primer producto al carrito para productos", () => {
  cy.clickAddToCartByProductIdPASS(1); // Hover + clic
});

When("hago clic en el botón 'Continuar comprando' para productos", () => {
  modal.clickContinueShoppingButton(); //click en el botón "Continuar comprando" del modal
});

When("agrego el segundo producto al carrito para productos", () => {
  cy.clickAddToCartByProductIdPASS(2);
});

When("hago clic en el botón 'Ver carrito' para productos", () => {
     cartPage.clickCartPage();
});

Then("debería ver ambos productos en el carrito para productos", () => {
    cartPage.verifyProductInTheCart(); // Verifica que el/los productos esté en el carrito, al menos 1
});

/* Then("sus precios, cantidades y precios totales deben ser correctos", () => {
  cartPage.verifyProductPriceQuantityAndTotal(1);
  cartPage.verifyProductPriceQuantityAndTotal(2);
}); */
