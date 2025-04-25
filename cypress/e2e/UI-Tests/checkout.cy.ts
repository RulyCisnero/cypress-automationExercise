import { HomePage } from "../../support/HomePage/HomePage";
import { LoginPage } from "../../support/LoginPage/LoginPage";
import { ProductPage } from "../../support/ProductPage/ProductPage";
import { CartPage } from "../../support/CartPage/CartPage";
import { CheckoutPage } from "../../support/CartPage/Checkout";
import { PaymentPage } from "../../support/PaymentPage/PaymentPage";
import { NavbarPage } from "../../support/navbar/navbar";

const homePage = new HomePage();
const loginPage = new LoginPage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const check_out = new CheckoutPage();
const paymentPage = new PaymentPage();
const navbarPage = new NavbarPage();


describe("Checkout and Order Suite", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
        homePage.verifyBannerPagina(); 
    });

    it('Place Order: Register while Checkout', () => {
        productPage.clickViewProductButton(4);//pasarle un index que seria la ubicacion de cualquier producto en la lista de productos
        productPage.addQuantity("4"); // Agrega una cantidad de 4 al producto
        productPage.clickaddToCart(); 
        cy.url().should('include', '/view_cart'); 
        cy.contains('Shopping Cart').should('be.visible'); // Si hay un título así
        cartPage.grillaDeProductosVisible(); // Verifica que la grilla de productos esté visible
        cartPage.clickCheckoutButton();
        cartPage.clickLoginButtonModal(); 
        cy.deleteUserIfExists();
        cy.fillUserForm();
        loginPage.clickCreateAccount();
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();
        cy.verifyLoginAccountVisible();
        navbarPage.clickCartPage(); 
        cartPage.clickCheckoutButton(); 
        cartPage.verifyDetailsInformationVisible();//Verifica que se muestren detalles de dirección y resumen del pedido
        cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
        cartPage.clickPlaceOrderButton(); 

        cy.fillCardDetails(); 
        paymentPage.clickSubmitPayment();
        paymentPage.verifySuccessMessage();
        navbarPage.clickDeleteAccountPage(); 
        navbarPage.infoDeleteAccount(); 
        navbarPage.clickContinueButton(); 
    });

    it('Place Order: Register before Checkout', () => {
        navbarPage.clickSignupLoginPage();
        cy.deleteUserIfExists();
        cy.fillUserForm();
        loginPage.clickCreateAccount();
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();
        cy.verifyLoginAccountVisible();

        productPage.clickViewProductButton(4);  
        productPage.addQuantity("2");
        productPage.clickaddToCart();

        navbarPage.clickCartPage();
        cartPage.clickCheckoutButton();
        cartPage.verifyDetailsInformationVisible();
        cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
        cartPage.clickPlaceOrderButton(); 
        cy.fillCardDetails(); 
        paymentPage.clickSubmitPayment();
        paymentPage.verifySuccessMessage();
        cy.deleteUserWithAPI(); 
    });

    it('Place Order: Login before Checkout', () => {
        navbarPage.clickSignupLoginPage();
        cy.UserLogin();
        loginPage.clickLoginButton()
        cy.verifyLoginAccountVisibleUserExist();

        productPage.clickViewProductButton(4);
        productPage.addQuantity("2");
        productPage.clickaddToCart();

        navbarPage.clickCartPage();
        cartPage.clickCheckoutButton();
        cartPage.verifyDetailsInformationVisible();
        cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
        cartPage.clickPlaceOrderButton();
        cy.fillCardDetails();
        paymentPage.clickSubmitPayment();
        paymentPage.verifySuccessMessage();
    });

    it('Test Case 23: Verify address details in checkout page', () => {
        navbarPage.clickSignupLoginPage();
        cy.deleteUserIfExists();            
        cy.fillUserForm(); 
        loginPage.clickCreateAccount();
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();

        productPage.clickViewProductButton(4);  
        productPage.addQuantity("2"); 
        productPage.clickaddToCart(); 
        cartPage.verifyProductInTheCart(); 
        cartPage.grillaDeProductosVisible(); 
        cartPage.clickCheckoutButton();
        cartPage.verifyDetailsInformationVisible(); 
        check_out.verifyAddressesMatchUserData(); //verifica que la informacion de la direccion coincida con la del usuario
        loginPage.deleteAccount(); 
        cy.deleteUserWithAPI(); 
    });

});