import { HomePage } from "../../support/HomePage/HomePage";
import { NavbarPage } from "../../support/navbar/navbar"; 
import { ContactPage } from "../../support/ContactPage/ContactPage";

const homePage = new HomePage();
const contactPage = new ContactPage();
const navbarPage = new NavbarPage();

describe('Contact Form Suite',()=>{
    beforeEach('visitando la pagina', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
        homePage.verifyBannerPagina();
    })

    it("Contact Us Form + API", () => {
        contactPage.clickContactUsButton();
        contactPage.verifyContactUsVisible();
        cy.fillContactUsForm();
        contactPage.clickSubmitButton();
        contactPage.verifyMessageSuccess();
        contactPage.clickButtonHome();
      });

});

