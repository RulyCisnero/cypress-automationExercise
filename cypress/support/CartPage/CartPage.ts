export class CartPage{
    modalSignupLoginButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    gridTable: () => Cypress.Chainable<JQuery<HTMLElement>>;
    checkoutButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    detailsInformation: () => Cypress.Chainable<JQuery<HTMLElement>>;
    enterText: () => Cypress.Chainable<JQuery<HTMLElement>>;
    placeOrderButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    modalViewCartButton: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(){
        this.checkoutButton = () => cy.get('.btn.btn-default.check_out'); // Selector para el botón de "Checkout cy.get('.col-sm-6 .check_out')"
        this.gridTable = () =>cy.get('#cart_info_table') //grilla de productos
        this.modalSignupLoginButton = () => cy.get('.modal-content a[href="/login"]');
        this.modalViewCartButton = () => cy.get('.modal-content a[href="/view_cart"]'); // Selector para el botón de "View Cart" dentro del modal   
        this.detailsInformation = () =>  cy.get('.checkout-information'); // Selector para la información del producto
        this.enterText = () => cy.get('textarea[name="message"]') // Selector para el campo de texto
        this.placeOrderButton = () => cy.get('a.check_out'); // Selector para el botón de "Place Order"
    }

    clickCheckoutButton() {
        this.checkoutButton().should('be.visible').click(); // Click en el botón de "Checkout"
    }

    grillaDeProductosVisible() {
        this.gridTable().should('exist').should('be.visible'); // Verifica que la grilla de productos esté presente
    }

    clickAddToCartByProductId(id: string | number) {
        cy.get(`.single-products:has([data-product-id="${id}"])`).within(() => {
            cy.get('.product-overlay')
                .invoke('css', 'display', 'block') // Forzar a que se muestre
                .should('be.visible');

            cy.get('.product-overlay .add-to-cart')
                .should('be.visible')
                .click({ force: true });
        });
    }

    clickLoginButtonModal() {
        this.modalSignupLoginButton().click(); // Click en el botón de "Login" dentro del modal
        cy.url().should('include', '/login'); // Verifica que la URL contenga "/login" 
    }

    clickViewCartButtonModal() {
        this.modalViewCartButton().click(); // Click en el botón de "View Cart" dentro del modal
        cy.url().should('include', '/view_cart'); // Verifica que la URL contenga "/view_cart"
    }

    verifyDetailsInformationVisible() {
        this.detailsInformation().should('exist').should('be.visible'); // Verifica que la información del producto esté presente
        cy.contains('Address Details').should('exist');
        cy.contains('Review Your Order').should('exist');
    }

  

    addOrderNote(text: string) {
        this.enterText().type(text); 
    }

    clickPlaceOrderButton() {
        this.placeOrderButton().contains('Place Order').click(); // Click en el botón de "Place Order"
        cy.url().should('include', '/payment'); // Verifica que la URL contenga "/payment"
    }

    //Elimina el producto del carrito segun el index (0)-> primer elemento
    removeProductFromCartByIndex(index: number) {
        cy.get('#cart_info_table tbody tr').eq(index).within(() => {
            cy.get('.cart_quantity_delete').click();
        });
    }
    
    //Usar cuando el carrito este vacio 
    //Verificar que el producto fue eliminado y el carrito está vacío
    verifyCartIsEmpty() {
        cy.get('#empty_cart')
            .should('be.visible')
            .and('contain.text', 'Cart is empty!');
    }

    /**
    * Verifica que haya al menos un producto cargado en el carrito.
    */
    verifyProductInTheCart() {
        cy.get('#cart_info_table tr[id^="product-"]')
            .should('have.length.greaterThan', 0);
    }

}