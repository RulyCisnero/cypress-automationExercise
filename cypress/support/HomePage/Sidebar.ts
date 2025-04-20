export class SidebarPage {
    leftsidebar: () => Cypress.Chainable<JQuery<HTMLElement>>;
    brands: () => Cypress.Chainable<JQuery<HTMLElement>>;
    constructor() {
        this.leftsidebar = () => cy.get('.left-sidebar');
        this.brands = () => cy.get('.brands_products');
    }

    leftSidebarVisible() {
        this.leftsidebar().should('be.visible'); // Verifica que el sidebar izquierdo esté visible
    }

    /**
      * Método para hacer clic en una categoría específica del sidebar izquierdo.
      * @param category - Nombre de la categoría: 'WOMEN', 'MEN' o 'KIDS'.
      */
    clickcategory(category: string) {
        this.leftsidebar() // accede al sidebar
            .contains('a', category) // busca el link que diga 'Women'
            .click(); // hace clic en ese link
        return category; // devuelve la categoría seleccionada
    }
    /**
     * Método que verifica que la categoría seleccionada esté visible.
    * Recorre todos los elementos <li> y selecciona el que contenga el texto del producto.
    * @param product - Nombre de Productos: 'DRESS', 'TOPS', 'SAREE'
    */
    showallProducts(product: string) {
        cy.get('.panel-body li')
            .contains(product, { matchCase: false })
            .should('be.visible')
            .click();
        return product;
    }
    verifyTextandProductVisible() {
        cy.get('features_items').contains('h2', 'Women - Dress Products').should('be.visible');
    }

    verifyBreadcrumb(expectedText: string) {
        cy.get('.breadcrumb').should('contain.text', expectedText);
    }

        //Verificar que el sidebar con marcas esté visible
        verifyBrandsVisible() {
            this.brands().should('be.visible').within(() => {
                cy.get('.nav-pills li').should('have.length.greaterThan', 0);
            });
        }
    
        clickbrands(brand: string) {
            this.brands().get('.nav-pills li') // accede a la lista de marcas
                .contains('a', brand)
                .click(); // hace clic en ese link
            return brand; // devuelve la categoría seleccionada
        }

        //---------dos metodos que no uso, estan refactorizados--------------------------------------------
    verifyNavigateBrandPage() {
        cy.url().should('include', 'brand_products/Polo');
        this.brands()
            .should('contain.text', 'Brand - Polo Products') // texto del título
            .and('be.visible');
    }

    clickOtherBrands(brand: string) {
        cy.get('.brands_products .nav-pills li a')
            .contains('H&M')
            .click();
        return brand; // devuelve la categoría seleccionada
    }
    //-----------------------------------------------------------------------------------
    /**
    * Método que hace clic en una marca específica del sidebar y verifica que se haya navegado correctamente.
    * Verifica también que los productos de la marca seleccionada estén visibles en la página.
    * 
    * @param brand - Nombre de la marca a seleccionar. Ejemplos: 'Polo', 'H&M', 'Babyhug', etc.
    * @description Este método busca el enlace de la marca dentro del sidebar, hace clic en él, 
    *              luego valida que la URL contenga la ruta correspondiente y que se muestren los productos 
    *              de esa marca en la sección principal.
    */
    clickAndVerifyBrand(brand: string) {
        cy.get('.brands_products .nav-pills li a')
            .contains(brand)
            .click();

        cy.url().should('include', `brand_products/${brand}`);
        cy.get('.features_items')
            .should('contain.text', `Brand - ${brand} Products`)
            .and('be.visible');
    }
    addAllSearchResultsToCart() {
        cy.get('.features_items .product-image-wrapper').each(($el, index) => {
            // Usa wrap para actuar sobre cada tarjeta de producto
            cy.wrap($el).within(() => {
                cy.contains('Add to cart').click();
            });

            // Cierra el modal si aparece, luego continúa con el siguiente producto
            cy.get('#cartModal')
                .should('be.visible')
                .within(() => {
                    cy.contains('Continue Shopping').click();
                });
        });
    }


}