import { HomePage } from "../../support/HomePage/HomePage";
import { ProductPage } from "../../support/ProductPage/ProductPage";
import { CartPage } from "../../support/CartPage/CartPage";
import { SidebarPage } from "../../support/HomePage/Sidebar";
import { ReviewProductPage } from "../../support/ProductPage/ReviweProduct";
import { NavbarPage } from "../../support/navbar/navbar";

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const sidebar = new SidebarPage();
const review = new ReviewProductPage();
const navbarPage = new NavbarPage();


describe("Products and Cart Suite", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/'); 
        homePage.verifyBannerPagina(); // Verifica que el banner esté visible y el boddy
    });

    it("Verify All Products and product detail page", () => {
        navbarPage.clickProductPage();
        productPage.clickProductsButton();
        productPage.verifyAllProductsPageVisible();
        productPage.productListVisible(); 
        productPage.clickfirstProduct(); 
        productPage.verifyUserIsOnProductDetailPage(); // Verifica que el usuario esté en la página de detalles del producto
        productPage.verifyProductDetails(); // Verifica que la página de detalles del producto esté visible
    });

    it("Search Product", () => {
        const searchTerm = 'Polo'; // Término de búsqueda
        navbarPage.clickProductPage(); 
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible 
        productPage.productListVisible(); // Verifica que todos los productos estén visibles
        productPage.searchProduct(searchTerm); // Busca el producto
        productPage.clickSearchButton();
        cy.verifySearchResultsMatchApi(searchTerm);// VALIDACIÓN CON LA API - Integración cruzada
        productPage.verifySearchedProductsTitle();
        productPage.verifySearchResultsVisible();
    });

    it('Add Products in Cart', () => {
        navbarPage.clickProductPage();
        cy.clickAddToCartByProductIdPASS(1); // Agrega el producto con ID 1 al carrito
    });

    it('Verify Product quantity in Cart', () => {
        productPage.clickViewProductButton(4);//pasarle un index que seria la ubicacion de cualquier producto en la lista de productos    
        productPage.verifyProductDetails2();
        const cantidad = productPage.addQuantity("4");
        productPage.clickaddToCart();
        productPage.verifyQuantityInCart(cantidad); // Verifica que la cantidad en el carrito sea correcta
    });

    it('Remove Products From Cart', () => {
        productPage.clickViewProductButton(4);
        productPage.addQuantity("2");
        productPage.clickaddToCart();
        cartPage.removeProductFromCartByIndex(0);
        cartPage.verifyCartIsEmpty();
    });

    it('Search Products and Verify Cart After Login', () => {
        navbarPage.clickProductPage(); 
        productPage.verifyAllProductsPageVisible(); 
        productPage.searchProduct('jeans');       // Busca el producto
        productPage.clickSearchButton(); 
        productPage.verifySearchResultsVisible(); // Verifica que los resultados de búsqueda estén visibles
        sidebar.addAllSearchResultsToCart();
        navbarPage.clickCartPage();
        cartPage.verifyProductInTheCart(); 
        navbarPage.clickSignupLoginPage();
        cy.deleteUserIfExists();
        cy.fillUserForm();
        navbarPage.clickCartPage();
        cartPage.verifyProductInTheCart();
    });

    it('Add to cart from Recommended items', () => {
        productPage.clickProductsButton();
        productPage.verifyAllProductsPageVisible(); // Verifica que la página de productos esté visible
        productPage.clickViewProductButton(2);      // Click en el segundo producto
        cy.fillReviewtForm();                       // Completa el formulario de reseña
        review.clickSubmitReview();                 // Click en el botón de enviar reseña
        review.verifyReviewMesaggeAlert();          // Verifica que el mensaje de éxito de reseña esté visible
    });

});