export class FooterPage{
    footerwidget: () => Cypress.Chainable<JQuery<HTMLElement>>;
    subscriptionEmailInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    subscriptionButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    subscriptionSuccessMessage: () => Cypress.Chainable<JQuery<HTMLElement>>;
    subscriptionTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(){
        this.footerwidget = () => cy.get('.footer-widget'); // Widget general del footer
         // Texto 'Subscription'
          
          this.subscriptionTitle = () => cy.get('.single-widget h2');// Contenedor del texto 'Subscription' (el <h2>)

         // Campo de email para suscripción
         this.subscriptionEmailInput = () => cy.get('#susbscribe_email'); 
 
         // Botón de suscribirse
         this.subscriptionButton = () => cy.get('#subscribe');
 
         // Mensaje de éxito al suscribirse
         this.subscriptionSuccessMessage = () =>cy.get('#success-subscribe .alert-success');
    }

    scrollToFotter() {
        cy.scrollTo('bottom', { duration: 2000 }); // 🔽 Scroll hasta el final de la página (efecto visible)
        cy.get('footer').scrollIntoView();         // 🎯 Asegura que el footer esté visible en el viewport
    }


    verifySubscriptionText() {
        cy.contains('Subscription').should('be.visible');
    }

    enterEmailAndClickSubscribe(email: string) {
        this.subscriptionEmailInput() 
            .type(email);
            this.subscriptionButton() 
            .click();
    }

    verifySubscriptionSuccessMessage() {
        cy.contains('You have been successfully subscribed!').should('be.visible');
    }

}