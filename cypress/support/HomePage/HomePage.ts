export class HomePage{
    bannerPagina: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor() {
        this.bannerPagina = () => cy.get('.col-sm-6') // Si hay un banner en la home
        
    }

    verifyBannerPagina() {
        cy.get('body').should('be.visible'); // primero verifica que la página cargó
        this.bannerPagina().contains('h2', 'Full-Fledged practice website for Automation Engineers')
            .should('be.visible');
    }
}