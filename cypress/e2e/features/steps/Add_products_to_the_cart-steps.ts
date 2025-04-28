import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductPage } from "../../../support/ProductPage/ProductPage";
import { CartPage } from "../../../support/CartPage/CartPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { ModalProductPage } from "../../../support/ProductPage/ModalProductPage";
import { NavbarPage } from "../../../support/navbar/navbar";

const productPage = new ProductPage();
const cartPage = new CartPage();
const homePage = new HomePage();
const modal = new ModalProductPage();
const navbarPage = new NavbarPage();

Given("I visit the homepage for products", () => {
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("I click on the Products button", () => {
  productPage.clickProductsButton();
});

When("I add the first product to the cart", () => {
  cy.clickAddToCartByProductIdPASS(1); 
});

When("I click on the 'Continue Shopping' button", () => {
  modal.clickContinueShoppingButton(); //click en el botón "Continuar comprando" del modal
});

When("I add the second product to the cart", () => {
  cy.clickAddToCartByProductIdPASS(2);
});

When("I click on the 'View Cart' button", () => {
     navbarPage.clickCartPage(); 
});

Then("I should see both products in the cart", () => {
    cartPage.verifyProductInTheCart(); // Verifica que el/los productos esté en el carrito, al menos 1
});

/* Then("sus precios, cantidades y precios totales deben ser correctos", () => {
  cartPage.verifyProductPriceQuantityAndTotal(1);
  cartPage.verifyProductPriceQuantityAndTotal(2);
}); */
