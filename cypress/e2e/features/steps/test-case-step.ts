import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../../support/HomePage/HomePage";
import { TestCasesPage } from "../../../support/TestCasesPage/TestCasesPage";

const homePage = new HomePage();
const testCasesPage = new TestCasesPage();

Given("I visit the homepage fot testcase", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  homePage.verifyBannerPagina();
});

When("I click on the Test Cases button", () => {
  testCasesPage.clickTestCasePageButton();
  cy.wait(2000); // si no es esencial, después podrías reemplazar con un wait dinámico
});

Then("I should be navigated to the Test Cases page successfully", () => {
  testCasesPage.allTitlesTestCases(); // esto sería tu verificación del contenido de la página
});
