import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CartPage } from "../../../support/CartPage/CartPage";
import { FooterPage } from "../../../support/FooterPage/FooterPage";
import { HomePage } from "../../../support/HomePage/HomePage";
import { NavbarPage } from "../../../support/navbar/navbar";

const cartPage = new CartPage();
const footerPage = new FooterPage();
const homePage = new HomePage();
const navbarPage = new NavbarPage();  

Given("I visit the home page", () => {
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("I click on the cart button", () => {
  navbarPage.clickCartPage();
});

When("I scroll to the footer", () => {
  footerPage.scrollToFotter();
});

Then("I should see the text 'SUBSCRIPTION' on page", () => {
  footerPage.verifySubscriptionText();
});

When("I enter an email and click the subscription button", () => {
  cy.subscribeWithEmail();
});

Then("I should see the success message 'You have been successfully subscribed!' GG test",() => {
  footerPage.verifySubscriptionSuccessMessage();
});
