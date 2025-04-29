export class ProductPage {
    products: () => Cypress.Chainable<JQuery<HTMLElement>>;
    allProducts: () => Cypress.Chainable<JQuery<HTMLElement>>;
    listProducts: () => Cypress.Chainable<JQuery<HTMLElement>>;
    productInformation: () => Cypress.Chainable<JQuery<HTMLElement>>;
    name: () => Cypress.Chainable<JQuery<HTMLHeadingElement>>;
    price: () => Cypress.Chainable<JQuery<HTMLElement>>;
    category: () => Cypress.Chainable<JQuery<HTMLElement>>;
    availability: () => Cypress.Chainable<JQuery<HTMLElement>>;
    condition: () => Cypress.Chainable<JQuery<HTMLElement>>;
    brand: () => Cypress.Chainable<JQuery<HTMLElement>>;
    search: () => Cypress.Chainable<JQuery<HTMLElement>>;
    searchButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    searchResultsNames: () => Cypress.Chainable<JQuery<HTMLElement>>;
    tarjetaProducto: () => Cypress.Chainable<JQuery<HTMLElement>>;
    quantity: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor() {
        this.products = () => cy.get('a[href="/products"]');
        this.allProducts = () => cy.get('h2.title.text-center'); // Selector para el título de "All Products"
        this.listProducts = () => cy.get('.features_items .col-sm-4');
        this.search = () => cy.get('#search_product'); // Selector para el campo de búsqueda
        this.searchButton = () => cy.get('#submit_search'); // Selector para el botón de búsqueda
        this.productInformation = () => cy.get('.product-information'); // Selector para la información del producto
        this.name = () => cy.get('h2'); // Selector para el nombre del producto
        this.category = () => cy.get('p.category'); // Selector para la categoría del producto
        this.price = () => cy.get('p.price'); // Selector para el precio del producto
        this.availability = () => cy.get('p.availability'); // Selector para la disponibilidad del producto
        this.condition = () => cy.get('p.condition'); // Selector para la condición del producto
        this.brand = () => cy.get('p.brand'); // Selector para la marca del producto
        this.searchResultsNames = () => cy.get('.features_items .productinfo p:first-child');
        this.tarjetaProducto = () => cy.get('.choose');
        this.quantity = () => cy.get("#quantity")
    }

    
    verifyAllProductsPageVisible() {
        cy.get('.features_items').should('exist'); // Verifica que el contenedor principal esté presente

        this.allProducts()
            .should('contain.text', 'All Products')
            .and('be.visible'); // Verifica que el título esté visible
    }

    productListVisible() {
        this.listProducts().should('have.length.greaterThan', 0)
            .and('be.visible'); // Verifica que haya al menos un producto visible  
    }
    
    clickfirstProduct() {
        this.listProducts()
            .first()
            .find('a[href*="product_details"]')
            .click();
        }

    verifyUserIsOnProductDetailPage() {
        cy.url().should('include', '/product_details/');
        this.productInformation().should('be.visible');
    }

    verifyProductDetails() {
        this.productInformation().within(() => {
            this.name().should('be.visible'); // product name
            cy.contains('Category').should('be.visible');
            cy.contains('Rs.').should('be.visible'); // price
            cy.contains('p', 'Availability: In Stock').should('be.visible');
            cy.contains('p', 'Condition: New').should('be.visible');
            cy.contains('p', 'Brand:').should('be.visible');
        });
    }


    searchProduct(productName: string) {
        this.search() // Selector para el campo de búsqueda
            .should('exist')         // Verifica que exista
            .and('be.enabled')      // Verifica que esté habilitado
            .should('be.visible')     // Verifica que esté visible
            .clear()                  // Limpia si ya tiene algo
            .type(productName);       // Escribe el producto a buscar
    }

    clickSearchButton() {
        this.searchButton() // Selector para el botón de búsqueda
            .should('exist')         // Verifica que exista
            .should('be.visible')
            .click();
        }

    verifySearchedProductsTitle() {
        cy.contains('h2', 'Searched Products').should('be.visible'); // Verifica que el título "Searched
    }
    
    verifySearchResultsVisible() {
        cy.get('.features_items .productinfo')
        .should('have.length.greaterThan', 0) // Asegura que hay productos
            .each(($el) => {
                cy.wrap($el).should('be.visible'); // Cada uno debe estar visible
            });
    }
    
    clickViewProductButton(index: number) {
        cy.get('.choose')
            .eq(index)
            .contains('a', 'View Product')
            .should('be.visible')
            .click();
    }
    
    verifyProductDetails2() {
        cy.get('.product-information').within(() => {
            cy.get('h2').should('be.visible'); // product name
            cy.contains('Category').should('be.visible');
            cy.contains('Rs.').should('be.visible'); // price
            cy.contains('p', 'Availability: In Stock').should('be.visible');
            cy.contains('p', 'Condition: New').should('be.visible');
            cy.contains('p', 'Brand:').should('be.visible');
            cy.contains('Quantity:').should('be.visible');
        });
    }

    addQuantity(quantity: string) {
        this.quantity().clear().type('4'); // Cambia el valor del input de cantidad    
        return quantity; // Devuelve la cantidad ingresada
    }
    
    clickaddToCart() {
        cy.get('.product-information').contains("Add to cart").click(); // Cambia el selector al correcto para el botón "Add to cart"
        cy.get('.modal-dialog').should('be.visible'); // Verifica que el modal esté visible
        cy.contains("View Cart").click();
    }
    
    /**
     *Verifica que la cantidad del primer producto en el carrito coincida con la esperada.
     *
     * @param {string | number} expectedQuantity - Cantidad esperada en el carrito.
     */
    verifyQuantityInCart(expectedQuantity) {
        cy.get('#cart_info_table').within(() => {
            cy.get('tr[id^="product-"]').first().within(() => {
                cy.get('.cart_quantity button.disabled')
                .should('be.visible')
                .and('have.text', expectedQuantity);
            });
        });
    }

    clickProductsButton() {
        this.products().click();
    }
    
}
