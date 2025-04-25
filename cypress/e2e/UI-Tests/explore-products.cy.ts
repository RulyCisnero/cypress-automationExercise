import { HomePage } from "../../support/HomePage/HomePage";
import { ProductPage } from "../../support/ProductPage/ProductPage";
import { SidebarPage } from "../../support/HomePage/Sidebar";
import { ReviewProductPage } from "../../support/ProductPage/ReviweProduct";
import { NavbarPage } from "../../support/navbar/navbar";

const homePage = new HomePage();
const productPage = new ProductPage();
const sidebar = new SidebarPage();
const review = new ReviewProductPage();
const navbarPage = new NavbarPage();

describe("Product Exploration Suite", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/'); 
        homePage.verifyBannerPagina(); 
    });

    it('View Category Products', () => {
        sidebar.leftSidebarVisible();
        sidebar.clickcategory('Women');
        sidebar.showallProducts('Dress');      
        const category = sidebar.clickcategory('Men');
        const product = sidebar.showallProducts('Tshirts');
        sidebar.verifyBreadcrumb(`${category} > ${product}`);
    });

    it('View & Cart Brand Products', () => {
        navbarPage.clickProductPage();
        sidebar.leftSidebarVisible();
        sidebar.verifyBrandsVisible();
        sidebar.clickAndVerifyBrand('Polo');
    });

    it('Add review on product', () => {
        navbarPage.clickProductPage(); 
        productPage.verifyAllProductsPageVisible(); 
        productPage.clickViewProductButton(2); 
        cy.fillReviewtForm(); 
        review.clickSubmitReview(); 
        review.verifyReviewMesaggeAlert(); 
    });
  
});


