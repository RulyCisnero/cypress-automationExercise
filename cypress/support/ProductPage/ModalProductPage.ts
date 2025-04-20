export class ModalProductPage {
    modal: () => Cypress.Chainable<JQuery<HTMLElement>>;
    modalViewCartButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    continueShoppingButton: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(){
        this.modal = () => cy.get('.modal-content'); // Selector para el modal
        this.modalViewCartButton = () => cy.get('.modal-content a[href="/view cart"]');
        this.continueShoppingButton = () => cy.get('.btn[class*=btn-success]') // Selector para el botón de "Continue Shopping"

    }

    clickViewCartButton() {
        this.modalViewCartButton().click(); // Click en el botón de "Login" dentro del modal
        cy.url().should('include', '/view_cart'); // Verifica que la URL contenga "/view_cart 
    }

    clickContinueShoppingButton() {
        this.continueShoppingButton().click(); // Click en el botón de "Continue Shopping" dentro del modal
        cy.url().should('include', '/products'); // Verifica que la URL  contenga "/products"
    }

}