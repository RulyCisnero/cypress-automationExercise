export class PaymentPage {
    cardNameField: () => Cypress.Chainable<JQuery<HTMLElement>>;
    cardNumberField: () => Cypress.Chainable<JQuery<HTMLElement>>;
    cvcField: () => Cypress.Chainable<JQuery<HTMLElement>>;
    expiryMonthField: () => Cypress.Chainable<JQuery<HTMLElement>>;
    expiryYearField: () => Cypress.Chainable<JQuery<HTMLElement>>;
    submitButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    successMessage: () => Cypress.Chainable<undefined>;

    constructor(){
    this.cardNameField = () => cy.get('input[name="name_on_card"]');
    this.cardNumberField = () => cy.get('input[name="card_number"]');
    this.cvcField = () => cy.get('input[name="cvc"]');
    this.expiryMonthField = () => cy.get('input[name="expiry_month"]');
    this.expiryYearField = () => cy.get('input[name="expiry_year"]');
    this.submitButton = () => cy.get('#submit');
    this.successMessage = () => cy.contains('Congratulations! Your order has been confirmed!');  
    }
    
  
    fillCardDetails({ name, number, cvc, month, year }: { name: string; number: string; cvc: string; month: string; year: string }) {
      this.cardNameField().type(name);
      this.cardNumberField().type(number);
      this.cvcField().type(cvc);
      this.expiryMonthField().type(month);
      this.expiryYearField().type(year);
    }
  
    submitPayment() {
      this.submitButton().click();
    }
  
    verifySuccessMessage() {
      this.successMessage().should('be.visible');
    }
  }
  
  