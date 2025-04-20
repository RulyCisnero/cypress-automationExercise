import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { FooterPage } from "../../../support/FooterPage/FooterPage";
import { HomePage } from "../../../support/HomePage/HomePage";

const footerPage = new FooterPage();
const homePage = new HomePage();

Given("I visit the homepage for subscription", () => {
  cy.visit('/');
  homePage.verifyBannerPagina(); // tu método, bien en español
});

When("I scroll down to the footer", () => {
  footerPage.scrollToFotter(); // tu método
});

Then("I should see the text 'SUBSCRIPTION'", () => {
  footerPage.verifySubscriptionText(); // tu método
});

When("I enter an email and click the subscribe button", () => {
  cy.subscribeWithEmail(); // tu comando custom
});

Then("I should see the success message 'You have been successfully subscribed!'", () => {
  footerPage.verifySubscriptionSuccessMessage(); // tu método
});
