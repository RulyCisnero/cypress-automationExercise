export class navbar {
    menunavbar: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(){
        this.menunavbar = ()=> cy.get('.nav.navbar-nav');
    }

    clickHomePage(){
        this.menunavbar().find('a[href="/"]').click();
    }

    clickProductPage(){
        this.menunavbar().find('a[href="/products"]').click();
    }

    clickCartPage(){
        this.menunavbar().find('a[href="/view_cart"]').click();;
    }

    clickSignupLoginPage(){
        this.menunavbar().find('a[href="/login"]').click();
    }

    clickTestCasesPage(){
        this.menunavbar().find('a[href="/test_cases"]').click();
    }

    clickApiListPage(){
        this.menunavbar().find('a[href="/api_list"]').click();
    }

    clickVideoTutorialsPage(){
        this.menunavbar().find('a[href="https://www.youtube.com/c/AutomationExercise"]').click();
    }

    clickContactUsPage(){
        this.menunavbar().find('a[href="/contact_us"]').click();
    }
}