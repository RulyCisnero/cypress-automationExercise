import { HomePage } from "../../support/HomePage/HomePage";
import { TestCasesPage } from "../../support/TestCasesPage/TestCasesPage";
import { FooterPage } from "../../support/FooterPage/FooterPage";
import { NavbarPage } from "../../support/navbar/navbar";

const homePage = new HomePage();
const testCasesPage = new TestCasesPage();
const footerPage = new FooterPage();
const navbarPage = new NavbarPage();

describe('Navigation and Subscription Suite', () => {
    beforeEach('visitando la pagina', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
        homePage.verifyBannerPagina();
    });

    it("Verify Test Cases Page", () => {
        testCasesPage.clickTestCasePageButton();
        testCasesPage.allTitlesTestCases();
    });

    it('Verify Subscription in home page', () => {
        footerPage.scrollToFotter(); 
        footerPage.verifySubscriptionText();
        cy.subscribeWithEmail();
        footerPage.verifySubscriptionSuccessMessage(); 
    });

    it('Verify Subscription in Cart page', () => {
        navbarPage.clickCartPage(); 
        footerPage.scrollToFotter(); 
        footerPage.verifySubscriptionText();
        cy.subscribeWithEmail();
        footerPage.verifySubscriptionSuccessMessage();
    });
    
});