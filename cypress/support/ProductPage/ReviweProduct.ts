export class ReviewProductPage {
    review: () => Cypress.Chainable<JQuery<HTMLElement>>;
    reviewForm: () => Cypress.Chainable<JQuery<HTMLElement>>;
    recommended_items: () => Cypress.Chainable<JQuery<HTMLElement>>;
    msjAlert: () => Cypress.Chainable<JQuery<HTMLElement>>;
    
    constructor() {
        this.review = ()=> cy.get('.col-sm-12');
        this.reviewForm = () => cy.get('#review-form');
        this.recommended_items = () => cy.get('.recommended_items');
        this.msjAlert = () => cy.get('.alert-success');
        
    }
    verifyReviewsVisible() {
        this.review().contains('a', 'Write Your Review').should('be.visible');
    }

    enterNameAndEmailReview(name : string ,email: string, review: string) {
        this.reviewForm().get('#name').type(name); // Nombre
        this.reviewForm().get('#email').type(email); // Email
        this.reviewForm().get('#review').type(review); // Reseña
    }
    
    clickSubmitReview() {
        this.reviewForm().contains('button', 'Submit').click(); // Botón de enviar reseña
    }

    verifyReviewMesaggeAlert() {
        this.msjAlert().contains('Thank you for your review.').should('be.visible'); // Verifica que el mensaje de éxito esté visible
    }

    verifyRecommendedItemsVisible() {
        this.recommended_items().contains('recommended items').should('be.visible'); // Verifica que la sección de productos recomendados esté visible
    }
}