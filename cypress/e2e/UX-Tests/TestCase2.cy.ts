import { HomePage } from "../../support/HomePage/HomePage";
import { LoginPage } from "../../support/LoginPage/LoginPage";
import { ProductPage } from "../../support/ProductPage/ProductPage";
import { FooterPage } from "../../support/FooterPage/FooterPage";
import { CartPage } from "../../support/CartPage/CartPage";
import { SidebarPage } from "../../support/HomePage/Sidebar";
import { ReviewProductPage } from "../../support/ProductPage/ReviweProduct";
import { CheckoutPage } from "../../support/CartPage/Checkout";


const homePage = new HomePage();
const loginPage = new LoginPage();
const productPage = new ProductPage();
const footerPage = new FooterPage();
const cartPage = new CartPage();
const sidebar = new SidebarPage();
const review = new ReviewProductPage();
const check_out = new CheckoutPage();


//const probando = new SignupPage;
describe("Test Cases parte 2", () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.wait(2000); // Espera 2 segundos antes de cada prueba
        cy.visit("https://automationexercise.com/"); // Visita la página de registro
        homePage.verifyBannerPagina(); // Verifica que el banner esté visible y el boddy
    });
 
    it("Test Case 8: Verify All Products and product detail page", () => {
        productPage.clickProductsButton(); // Click en el botón de productos
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible 
        productPage.productListVisible(); // Verifica que todos los productos estén visibles
        cy.wait(2000); // Espera 2 segundos para que se carguen los productos
        productPage.clickfirstProduct(); // Click en el primer producto
        productPage.verifyUserIsOnProductDetailPage(); // Verifica que el usuario esté en la página de detalles del producto
        productPage.verifyProductDetails(); // Verifica que la página de detalles del producto esté visible
    });

    it("Test Case 9: Search Product", () => {
        const searchTerm = 'Polo'; // Término de búsqueda
        productPage.clickProductsButton(); // Click en el botón de productos
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible 
        productPage.productListVisible(); // Verifica que todos los productos estén visibles
        productPage.searchProduct(searchTerm); // Busca el producto
        productPage.clickSearchButton();
        cy.wait(2000); // Espera 2 segundos para que se carguen los productos
        productPage.verifySearchedProductsTitle();
        productPage.verifySearchResultsVisible();
        // VALIDACIÓN CON LA API - Integración cruzada
        //cy.verifySearchResultsMatchApi(searchTerm); // Verifica que los resultados de búsqueda coincidan con la API
    });

    it('Test Case 10: Verify Subscription in home page', () => {
        footerPage.scrollToFotter(); // Desplaza la página hacia el pie de página
        footerPage.verifySubscriptionText();
        cy.subscribeWithEmail();
        footerPage.verifySubscriptionSuccessMessage(); // Verifica que el mensaje de éxito de suscripción esté visible
    });

    it('Test Case 11: Verify Subscription in Cart page', () => {
        cartPage.clickCartPage(); // Click en el botón de carrito y Verifica que la URL contenga "/view_cart" 
        footerPage.scrollToFotter(); // Desplaza la página hacia el pie de página
        footerPage.verifySubscriptionText();
        cy.subscribeWithEmail();
        footerPage.verifySubscriptionSuccessMessage(); // Verifica que el mensaje de éxito de suscripción esté visible
    });


    it('Test Case 12: Add Products in Cart', () => {
        productPage.clickProductsButton(); // Click en el botón de productos
        cy.wait(2000); // Espera 2 segundos para que se carguen los productos
        cy.clickAddToCartByProductIdPASS(1); // Agrega el producto con ID 1 al carrito

    });

    it('Test Case 13: Verify Product quantity in Cart', () => {
        productPage.clickViewProductButton(4);//pasarle un index que seria la ubicacion de cualquier producto en la lista de productos    
        productPage.verifyProductDetails2(); // Verifica que la página de detalles del producto esté visible  
        const cantidad = productPage.addQuantity("4");
        productPage.clickaddToCart();
        productPage.verifyQuantityInCart(cantidad); // Verifica que la cantidad en el carrito sea correcta
    });

    it('Test Case 14: Place Order: Register while Checkout', () => {
        productPage.clickViewProductButton(4);//pasarle un index que seria la ubicacion de cualquier producto en la lista de productos
        productPage.addQuantity("4"); // Agrega una cantidad de 4 al producto
        productPage.clickaddToCart(); // Click en "Add to cart"
        cy.url().should('include', '/view_cart'); // Verifica que la URL contenga "/view_cart"
        cy.contains('Shopping Cart').should('be.visible'); // Si hay un título así
        cartPage.grillaDeProductosVisible(); // Verifica que la grilla de productos esté visible
        cartPage.clickCheckoutButton();
        cartPage.clickLoginButtonModal(); // Click en el botón de registro
        //cy.deleteUserWithAPI(); // Elimina el usuario antes de registrarlo nuevamente
        cy.wait(2000); // Espera 2 segundos para que se cargue la página
        cy.deleteUserIfExists();
        //cy.fillSignupForm(); // Completa el formulario de registro
        cy.fillUserForm();
        loginPage.clickCreateAccount();
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();
        cy.wait(1000);
        cy.verifyLoginAccountVisible();// Verifica que la cuenta de usuario esté visible
        cartPage.clickCartPage(); // Click en el botón de carrito
        cartPage.clickCheckoutButton(); // Click en el botón de "Checkout"

        //Verifica que se muestren detalles de dirección y resumen del pedido
        cartPage.verifyDetailsInformationVisible();
        // Paso 15: Agrega comentario
        cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
        cartPage.clickPlaceOrderButton(); // Click en el botón de "Place Order"
        // Paso 16: Datos de tarjeta
        cy.fillCardDetails(); // Completa el formulario de pago
        cy.get('#submit').click();

        // Paso 17-18: Verifica mensaje de éxito
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        // Paso 19-20: Eliminar cuenta
        cy.get('a[href="/delete_account"]').click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('a.btn.btn-primary').contains('Continue').click();
    });

 
    it('Test Case 15: Place Order: Register before Checkout', () => {
        loginPage.clickSignupLogin() // Paso 4
        cy.deleteUserIfExists();            // Eliminamos si existe
        //cy.fillSignupForm();                // Paso 5
        cy.fillUserForm();                 // Paso 5 continuado
        loginPage.clickCreateAccount();
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();
        cy.verifyLoginAccountVisible();    // Paso 7

        // Paso 8 - Agregar producto
        productPage.clickViewProductButton(4);
        productPage.addQuantity("2");
        productPage.clickaddToCart();

        // Paso 9 - Ir al carrito
        cartPage.clickCartPage(); // Tu método personalizado

        // Paso 10 - Verificar carrito
        cy.contains('Shopping Cart').should('be.visible');
        cy.get('#cart_info_table').should('be.visible');

        // Paso 11 - Checkout
        cy.get('.check_out').should('be.visible').click();
        cy.wait(1000);
        // Paso 12-14
        //Verifica que se muestren detalles de dirección y resumen del pedido
        cartPage.verifyDetailsInformationVisible();
        // Paso 15: Agrega comentario
        cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
        cartPage.clickPlaceOrderButton(); // Click en el botón de "Place Order"
        cy.fillCardDetails(); // Completa el formulario de pago
        cy.get('#submit').click(); // Reutilizás si tenés este método

        // Paso 16
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        // Paso 17-18
        cy.deleteUserWithAPI(); // Limpiás si el usuario fue creado
    });


    it('Test Case 16: Place Order: Login before Checkout', () => {
        loginPage.clickSignupLogin()         // Paso 4
        cy.UserLogin();
        //cy.deleteUserIfExists();            // Eliminamos si existe
        //cy.fillUserForm();                  // formulario de alta usuario
        //loginPage.clickCreateAccount();
        //loginPage.verifyAccountCreated();
        //loginPage.clickContinueButton();
        //loginPage.clickLogOutButton();       // Salimos de la cuenta
        //loginPage.clickSignupLogin();        // volvemos a la parte de login
        //cy.UserLogin();                     // logeo email y password
        //cy.verifyLoginAccountVisible();     // Verifica que el usuario haya iniciado sesión correctamente
        loginPage.clickLoginButton()
        cy.verifyLoginAccountVisibleUserExist();

        // Paso 8 - Agregar producto
        productPage.clickViewProductButton(4);
        productPage.addQuantity("2");
        productPage.clickaddToCart();

        // Paso 9 - Ir al carrito
        cartPage.clickCartPage(); //método personalizado

        // Paso 10 - Verificar carrito
        cy.contains('Shopping Cart').should('be.visible');
        cy.get('#cart_info_table').should('be.visible');

        // Paso 11 - Checkout
        cy.get('.check_out').should('be.visible').click();

        //Verifica que se muestren detalles de dirección y resumen del pedido
        cartPage.verifyDetailsInformationVisible();
        // Paso 15: Agrega comentario
        cartPage.addOrderNote('Por favor, entregar entre las 9 y las 12 hs.');
        cartPage.clickPlaceOrderButton(); // Click en el botón de "Place Order"
        // Paso 12-14
        cy.fillCardDetails(); // Completa el formulario de pago
        cy.get('#submit').click(); // Reutilizás si tenés este método

        // Paso 16
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        // Paso 17-18
        //cy.deleteUserWithAPI(); // Limpiás si el usuario fue creado
    });

    it('Test Case 17: Remove Products From Cart', () => {
        productPage.clickViewProductButton(4);
        productPage.addQuantity("2");
        productPage.clickaddToCart();
        // Paso 7: Eliminar el primer producto del carrito
        cartPage.removeProductFromCartByIndex(0);
        // Paso 8: Verificar que el producto fue eliminado y el carrito está vacío
        cartPage.verifyCartIsEmpty();
    });

    it('Test Case 18: View Category Products', () => {
        sidebar.leftSidebarVisible();
        sidebar.clickcategory('Women');
        sidebar.showallProducts('Dress');
        //probando.verifyTextandProductVisible();
        cy.wait(2000); // Espera 2 segundos para que se carguen los productos
        const category = sidebar.clickcategory('Men');
        const product = sidebar.showallProducts('Tshirts');
        sidebar.verifyBreadcrumb(`${category} > ${product}`);
    });

    it('Test Case 19: View & Cart Brand Products', () => {
        productPage.clickProductsButton();
        sidebar.leftSidebarVisible();
        sidebar.verifyBrandsVisible();
        sidebar.clickAndVerifyBrand('Polo');
    });

    it('Test Case 20: Search Products and Verify Cart After Login', () => {
        productPage.clickProductsButton(); // Click en el botón de productos
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible
        productPage.searchProduct('jeans'); // Busca el producto
        productPage.clickSearchButton(); // Click en el botón de búsqueda
        productPage.verifySearchResultsVisible(); // Verifica que los resultados de búsqueda estén visibles
        cy.wait(2000); // Espera 2 segundos para que se carguen los productos
        sidebar.addAllSearchResultsToCart();
        cartPage.clickCartPage(); // Click en el botón de carrito
        cartPage.verifyProductInTheCart(); // Verifica que el/los productos esté en el carrito, al menos 1 
        loginPage.clickSignupLogin()         // Paso 4
        cy.deleteUserIfExists();            // Eliminamos si existe
        cy.fillUserForm();                  // formulario de alta usuario + verify... + click
        cartPage.clickCartPage(); // Click en el botón de carrito
        cartPage.verifyProductInTheCart(); // Verifica que el/los productos esté en el carrito, al menos 1
    });

    it('Test Case 21: Add review on product', () => {
        productPage.clickProductsButton(); // Click en el botón de carrito
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible
        productPage.clickViewProductButton(2); // Click en el segundo producto
        cy.fillReviewtForm(); // Completa el formulario de reseña
        review.clickSubmitReview(); // Click en el botón de enviar reseña
        review.verifyReviewMesaggeAlert(); // Verifica que el mensaje de éxito de reseña esté visible
    });

    it('Test Case 22: Add to cart from Recommended items', () => {
        productPage.clickProductsButton(); // Click en el botón de carrito
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible
        productPage.clickViewProductButton(2); // Click en el segundo producto
        cy.fillReviewtForm(); // Completa el formulario de reseña
        review.clickSubmitReview(); // Click en el botón de enviar reseña
        review.verifyReviewMesaggeAlert(); // Verifica que el mensaje de éxito de reseña esté visible
    });

    it('Test Case 23: Verify address details in checkout page', () => {
        loginPage.clickSignupLogin();
        cy.deleteUserIfExists();            // Eliminamos si existe
        cy.fillUserForm(); // Completa el formulario de registro
        loginPage.clickCreateAccount();
        loginPage.verifyAccountCreated();
        loginPage.clickContinueButton();

        //loginPage.verifyAccountCreated(); // Verifica que la cuenta de usuario esté creada
        productPage.clickViewProductButton(4); // Click en el cuarto producto 
        productPage.addQuantity("2"); // Agrega una cantidad de 2 al producto
        productPage.clickaddToCart(); // Click en "Add to cart"
        cartPage.verifyProductInTheCart(); // Verifica que el/los productos esté en el carrito, al menos 1
        cartPage.grillaDeProductosVisible(); // Verifica que la grilla de productos esté visible
        //cartPage.checkoutButton(); // Click en el botón de "Checkout"
        cartPage.clickCheckoutButton();
        cy.wait(2000); // Espera 2 segundos para que se cargue la página
        cartPage.verifyDetailsInformationVisible(); // Verifica que la información del producto esté visible
        check_out.verifyAddressesMatchUserData(); //verifica que la informacion de la direccion coincida con la del usuario
        loginPage.deleteAccount(); // Elimina la cuenta de usuario
        cy.deleteUserWithAPI(); // Elimina el usuario creado
    });

});




