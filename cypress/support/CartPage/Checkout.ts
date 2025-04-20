export class CheckoutPage {
    addressItemsBox: () => Cypress.Chainable<JQuery<HTMLElement>>;
    addresTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    fullname: () => Cypress.Chainable<JQuery<HTMLElement>>;
    addres1: () => Cypress.Chainable<JQuery<HTMLElement>>;
    addres2: () => Cypress.Chainable<JQuery<HTMLElement>>;
    addres3: () => Cypress.Chainable<JQuery<HTMLElement>>;
    cityStateZip: () => Cypress.Chainable<JQuery<HTMLElement>>;
    contry: () => Cypress.Chainable<JQuery<HTMLElement>>;
    phone: () => Cypress.Chainable<JQuery<HTMLElement>>;


    constructor() {
        this.addressItemsBox = () => cy.get('.address item box'); // Selector para el contenedor de los productoss
        this.addresTitle = () => cy.get('.address-title'); // Selector para el título de la dirección
        this.fullname = () => cy.get('.address_firstname.address_lastname').first();
        this.addres1 = () => cy.get('.address_address1.address_address2').eq(0); // "Globant"
        this.addres2 = () => cy.get('.address_address1.address_address2').eq(1); // "Alem"
        this.addres3 = () => cy.get('.address_address1.address_address2').eq(2); // "1200"
        this.cityStateZip = () => cy.get('.address_city.address_state_name.address_postcode').first();
        this.contry = () => cy.get('.address_country_name').first();
        this.phone = () => cy.get('.address_phone').first();
    }

    verifyAddressesMatchUserData() {
        cy.fixture('user').then((user) => {
          const fullName = `${user.gender}. ${user.firstName} ${user.lastName}`;
          const address1 = user.company;
          const address2 = user.address;
          const address3 = user.address2;
          const cityLine = `${user.city} ${user.state} ${user.zipcode}`;
          const country = user.country;
          const phone = user.mobileNumber;
          cy.log(" log const ciudad :",cityLine);
          cy.log("log user ciudad: ",`${user.city} ${user.state} ${user.zipcode}`)
          
          this.fullname().invoke('text').should('eq',fullName);
          this.addres1().invoke('text').should('eq', address1);
          this.addres2().invoke('text').should('eq', address2);
          this.addres3().invoke('text').should('eq', address3);
          this.cityStateZip().invoke('text').then((text) => {
            const formattedText = text.replace(/\s+/g, ' ').trim();
            expect(formattedText).to.eq(cityLine);
          });
          //this.cityStateZip().invoke('text').should('eq', cityLine);
          this.contry().invoke('text').should('eq', country);
          this.phone().invoke('text').should('eq', phone);
        });
      }
}