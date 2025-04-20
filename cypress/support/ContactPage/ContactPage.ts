export class ContactPage{
    contactUsButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    getInthuch: () => Cypress.Chainable<JQuery<HTMLElement>>;
    nameContactUs: () => Cypress.Chainable<JQuery<HTMLElement>>;
    emailContactUs: () => Cypress.Chainable<JQuery<HTMLElement>>;
    subjectContactUs: () => Cypress.Chainable<JQuery<HTMLElement>>;
    uploadFile: () => Cypress.Chainable<JQuery<HTMLElement>>;
    submitButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    okButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    messageSuccess: () => Cypress.Chainable<JQuery<HTMLElement>>;
    buttonHome: () => Cypress.Chainable<JQuery<HTMLElement>>;
    continueButtonLogin: () => Cypress.Chainable<JQuery<HTMLElement>>;
    message: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(){
          //boton de contactanos
          this.contactUsButton = () => cy.get('a[href="/contact_us"]');
          this.getInthuch = () => cy.get('h2[class*=title]');
          this.nameContactUs = () => cy.get('[data-qa=name]');
          this.emailContactUs = () => cy.get('[data-qa=email]');
          this.subjectContactUs = () => cy.get('[data-qa=subject]');
          this.message = () => cy.get('[data-qa=message]');
          this.uploadFile = () => cy.get('[data-qa=upload_file]');
          this.submitButton = () => cy.get('[data-qa=submit-button]');
          this.okButton = () => cy.get('[data-qa=ok-button]');
          this.messageSuccess = () => cy.get('div[class*=status]');
          this.buttonHome = () => cy.get('a[class*=btn-success]');
          this.continueButtonLogin = () => cy.get("[data-qa=continue-button]");
  
    }

    clickContinueButtonLogin() {
        this.continueButtonLogin().click();
    }

    clickContactUsButton() {
        this.contactUsButton().click();
    }

    verifyContactUsVisible() {
        this.getInthuch().contains('h2', 'Get In Touch').should('be.visible');
    }

    enterNameAndEmailContactUs(name: string, email: string) {
        this.nameContactUs().type(name);
        this.emailContactUs().type(email);
    }

    enterSubjectAndMessage(subject: string, meessage: string) {
        this.subjectContactUs().type(subject);
        this.message().type(meessage);
    }

    clickUploadFile() {
        this.uploadFile().click();
    }

    attachFile(filePath: string) {
        this.uploadFile().attachFile(filePath);
    }

    clickSubmitButton() {
        this.submitButton().click();
    }

    verifyOkButtonVisible() {
        this.okButton().should('be.visible');
    }
   
    verifyMessageSuccess() {
        this.messageSuccess().should('contain.text', 'Success! Your details have been submitted successfully.').should('be.visible');
    }

    clickButtonHome() {
        this.buttonHome().click();
    }
}