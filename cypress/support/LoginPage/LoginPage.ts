
export class LoginPage {
    signupLoginButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    newUserSignupTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    nameInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    emailInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    signupButton: () => Cypress.Chainable<JQuery<HTMLElement>>;


    accountInfoTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    titleRadioMr: () => Cypress.Chainable<JQuery<HTMLElement>>;
    titleRadioMrs: () => Cypress.Chainable<JQuery<HTMLElement>>;
    passwordInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    dobDaySelect: () => Cypress.Chainable<JQuery<HTMLElement>>;
    dobMonthSelect: () => Cypress.Chainable<JQuery<HTMLElement>>;
    dobYearSelect: () => Cypress.Chainable<JQuery<HTMLElement>>;
    newsletterCheckbox: () => Cypress.Chainable<JQuery<HTMLElement>>;
    specialOffersCheckbox: () => Cypress.Chainable<JQuery<HTMLElement>>;
    firstNameInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    lastNameInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    companyInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    addressInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    addressInput2: () => Cypress.Chainable<JQuery<HTMLElement>>;
    countrySelect: () => Cypress.Chainable<JQuery<HTMLElement>>;
    stateInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    cityInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    zipcodeInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    mobileNumberInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    createAccountButton: () => Cypress.Chainable<JQuery<HTMLElement>>;


    continueButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    logOutButton: () => Cypress.Chainable<JQuery<HTMLElement>>;

    loginTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    emailInputLogin: () => Cypress.Chainable<JQuery<HTMLElement>>;
    passwordInputLogin: () => Cypress.Chainable<JQuery<HTMLElement>>;
    loginButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    loginUser: () => Cypress.Chainable<JQuery<HTMLElement>>;
    deleteAccount: () => Cypress.Chainable<JQuery<HTMLElement>>;
    deleteAccountInfo: () => Cypress.Chainable<JQuery<HTMLElement>>;
    errorMsj: () => Cypress.Chainable<JQuery<HTMLParagraphElement>>;
    accountCreatedTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    loggedInAsText: () => Cypress.Chainable<JQuery<HTMLElement>>;
    createDeleteAccountButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    accountDeletedTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    accountDeletedContinueButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    continueButtonLogin: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor() {
        // ========================
        // 🔹 Elementos generales
        // ========================
        this.signupLoginButton = () => cy.get('a[href="/login"]');
        this.continueButton = () => cy.get('[data-qa=continue-button]');
        this.logOutButton = () => cy.get('a[href="/logout"]');
        this.continueButtonLogin = () => cy.get("[data-qa=continue-button]");

        // ========================
        // 🔹 Signup - Paso 1
        // ========================
        this.newUserSignupTitle = () => cy.get('.col-sm-4');
        this.nameInput = () => cy.get('input[data-qa="signup-name"]');
        this.emailInput = () => cy.get('input[data-qa="signup-email"]');
        this.signupButton = () => cy.get('button[data-qa="signup-button"]');

        // ========================
        // 🔹 Signup - Información de cuenta
        // ========================
        this.accountInfoTitle = () => cy.get('.title[class*=text-center]');
        this.titleRadioMr = () => cy.get('#id_gender1');
        this.titleRadioMrs = () => cy.get('#id_gender2');
        this.passwordInput = () => cy.get('[data-qa=password]');
        this.dobDaySelect = () => cy.get('[data-qa=days]');
        this.dobMonthSelect = () => cy.get('[data-qa=months]');
        this.dobYearSelect = () => cy.get('[data-qa=years]');
        this.newsletterCheckbox = () => cy.get('#newsletter');
        this.specialOffersCheckbox = () => cy.get('#optin');

        // ========================
        // 🔹 Signup - Información de dirección
        // ========================
        this.firstNameInput = () => cy.get('[data-qa=first_name]');
        this.lastNameInput = () => cy.get('[data-qa=last_name]');
        this.companyInput = () => cy.get('[data-qa=company]');
        this.addressInput = () => cy.get('[data-qa=address]');
        this.addressInput2 = () => cy.get('[data-qa=address2]');
        this.countrySelect = () => cy.get('[data-qa=country]');
        this.stateInput = () => cy.get('[data-qa=state]');
        this.cityInput = () => cy.get('[data-qa=city]');
        this.zipcodeInput = () => cy.get("[data-qa='zipcode']");
        this.mobileNumberInput = () => cy.get('[data-qa=mobile_number]');
        this.createAccountButton = () => cy.get('[data-qa=create-account]');

        // ========================
        // 🔹 Post-Creación de cuenta
        // ========================
        this.accountCreatedTitle = () => cy.get('[data-qa=account-created]');
        this.loggedInAsText = () => cy.get('.logged-in-as');
        this.createDeleteAccountButton = () => cy.get('[data-qa=delete-account]');

        // ❗ Este `accountCreatedTitle` está repetido con otro selector. 
        // Podrías renombrarlo como `accountDeletedTitle` para que no pise el anterior:
        this.accountDeletedTitle = () => cy.get('.account-deleted > h2');
        this.accountDeletedContinueButton = () => cy.get('[data-qa=deleted-continue]');

        // ========================
        // 🔹 Login (Test Case 2 y 3)
        // ========================
        this.loginTitle = () => cy.get('.col-sm-4');
        this.emailInputLogin = () => cy.get('[data-qa=login-email]');
        this.passwordInputLogin = () => cy.get('[data-qa=login-password]');
        this.loginButton = () => cy.get('[data-qa=login-button]');
        this.loginUser = () => cy.get('li a'); // o .get('i[class*=fa-user]');
        this.deleteAccount = () => cy.get('a[href="/delete_account"]');
        this.deleteAccountInfo = () => cy.get('[data-qa=account-deleted]');
        this.errorMsj = () => cy.get('.login-form > form > p');
    }

    //verifico que New User Signup! esté visible
    verifyNewUserSignupVisible() {
        return this.newUserSignupTitle().contains('h2', 'New User Signup!').should('be.visible');
    }


    enterNameAndEmail(name: string, email: string): void {
        this.nameInput().type(name);  // Ejecuta la acción de escribir en el campo 'name'
        this.emailInput().type(email);  // Ejecuta la acción de escribir en el campo 'email'
    }
    //click en signup para rellenar formulario
    clickSignupButton() {
        return this.signupButton().click();
    }

    //verifico que en el formulario este visible el texto Enter Account Information
    verifyAccountInfoFormVisible() {
        this.accountInfoTitle().should('contain.text', 'Enter Account Information');
        //return  this.accountInfoTitle.contains('b','Enter Account Information').should('be.visible');
    }

    clickTitleMr() {
        this.titleRadioMr().check();
    }
    clickTitleMrs() {
        this.titleRadioMrs().check();
    }

    enterPassword(password: string) {
        this.passwordInput().type(password);
    }

    birthdate(day: number, month: number, year: number) {
        this.dobDaySelect().select(day);
        this.dobMonthSelect().select(month);
        this.dobYearSelect().select(year);
    }

    addressInfo(firstName: string, lastName: string, company: string, address: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        this.firstNameInput().type(firstName);
        this.lastNameInput().type(lastName);
        this.companyInput().type(company);
        this.addressInput().type(address);
        this.addressInput2().type(address2);
        /* // 🔹 Verificamos si la opción del país existe antes de seleccionarla
        this.countrySelect().find("option").then((options) => {
         const countryExists = [...options].some(
             (option) => option.innerText.trim() === country
            );
            if(countryExists) {
                this.countrySelect().select(country);
            } else {
                cy.log(`⚠️ País no encontrado: ${country}`);
            }
         }); */
        this.countrySelect().select(country);
        this.stateInput().type(state);
        this.cityInput().type(city);
        this.zipcodeInput().type(zipcode);
        this.mobileNumberInput().type(mobileNumber);
    }
    checkNewsletterAndSpecialOffers() {
        this.newsletterCheckbox().check();
        this.specialOffersCheckbox().check();
    }

    //click en el boton de crear cuenta
    clickCreateAccount() {
        this.createAccountButton().click();
    }

    //verifico que el texto Account Created! esté visible
    verifyAccountCreated() {
        this.accountCreatedTitle().should('be.visible').and('contain.text', 'Account Created!');
    }
    //click en el boton de continuar para volver al homepage
    clickContinueButton() {
        this.continueButton().click();
    }
    //click para salir de la cuenta 
    clickLogOutButton() {
        this.logOutButton().click();
    }


    verifyLoginAccountVisible() {
        this.loginTitle().contains('h2', 'Login to your account').should('be.visible');
    }
    enterEmailAndPassword(email: string, password: string): void {
        this.emailInputLogin().type(email);
        this.passwordInputLogin().type(password);
    }

    //click boton de logeo email y password
    clickLoginButton() {
        this.loginButton().click();
    }

    verifyLoggedInUser(username: string) {
        this.loginUser().contains(` Logged in as ${username}`);/* .should('be.visible'); */
    }

    clickDeleteAccount() {
        this.deleteAccount().click();
    }

    verifyDeleteAccountInfo() {
        this.deleteAccountInfo().should('be.visible').and('contain.text', 'Account Deleted!');
    }

    clickContinueButtonLogin() {
        this.continueButtonLogin().click();
    }

    verifyErrorMsj() {
        this.errorMsj().should('have.text', 'Your email or password is incorrect!')/* .should('be.visible'); */
    }

    veryfyErrorMsj2() {
        this.errorMsj().contains('have.text', 'Email Address already exist!').should('be.visible');
    }

    dismissRememberpassword(){
        cy.on('window:alert',()=> true);
    }

}