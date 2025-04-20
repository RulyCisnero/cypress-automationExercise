import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ContactPage } from '../../../support/ContactPage/ContactPage';

const contactPage = new ContactPage();

Given('I visit the homepage Automation', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  cy.wait(1000);
});

When('I click on the Contact Us button', () => {
  contactPage.clickContactUsButton();
  cy.wait(2000);
});

When('I verify that the contact form is visible', () => {
  contactPage.verifyContactUsVisible();
});

When('I fill out the contact form with valid information', () => {
  cy.fillContactUsForm(); 
});

When('I submit the form and accept the alert', () => {
  contactPage.clickSubmitButton();
});

Then('I should see a success message confirming the form submission', () => {
  contactPage.verifyMessageSuccess();
});

Then('I click the Home button and verify that I am redirected to the homepage', () => {
  contactPage.clickButtonHome();
});