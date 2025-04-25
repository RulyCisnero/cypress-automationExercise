export class NavbarPage {
    menunavbar: () => Cypress.Chainable<JQuery<HTMLElement>>;
    containerDelete: () => Cypress.Chainable<JQuery<HTMLElement>>;
    buttonContinue: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(){
        this.menunavbar = ()=> cy.get('.nav.navbar-nav');
        this.containerDelete = () => cy.get('[data-qa="account-deleted"]').parents('.col-sm-9');
        this.buttonContinue = () => cy.get('[data-qa="continue-button"]');
    }

    clickHomePage(){
        this.menunavbar().find('a[href="/"]').click();
    }

    clickProductPage(){
        this.menunavbar().find('a[href="/products"]').click();
        cy.url().should('include', '/products');
    }

    clickCartPage(){
        this.menunavbar().find('a[href="/view_cart"]').click();
        cy.url().should('include', '/view_cart');
        //cy.get('#cart_info_table').should('be.visible');
    }

    clickSignupLoginPage(){
        this.menunavbar().find('a[href="/login"]').click();
        cy.url().should('include', '/login');
    }

    clickTestCasesPage(){
        this.menunavbar().find('a[href="/test_cases"]').click();
        cy.url().should('include', '/test_cases');
    }

    clickApiListPage(){
        this.menunavbar().find('a[href="/api_list"]').click();
        cy.url().should('include', '/api_list');
    }

    clickVideoTutorialsPage(){
        this.menunavbar().find('a[href="https://www.youtube.com/c/AutomationExercise"]').click();
        cy.url().should('include', 'youtube.com');
    }

    clickContactUsPage(){
        this.menunavbar().find('a[href="/contact_us"]').click();
        cy.url().should('include', '/contact_us');
    }

    clickDeleteAccountPage(){
        this.menunavbar().find('a[href="/delete_account"]').click();
        cy.url().should('include', '/delete_account');
    }

    infoDeleteAccount(){
        this.containerDelete().find('h2 > b').should('have.text', 'Account Deleted!');
        this.containerDelete().find('p').first().should('contain', 'permanently deleted');
    }

    //boton de continue en la pagina de cuenta eliminada
    clickContinueButton(){
        this.buttonContinue().click();
        cy.url().should('include', '/');
    }
}