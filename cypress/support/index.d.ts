interface User {
    name: string;
    email: string;
    gender: 'Mr' | 'Mrs';
    password: string;
    day: number;
    month: number;
    year: number;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    payment: {
        name: string;
        number: string;
        cvc: string;
        month: string;
        year: string;
    },
    existingUser: {
        name: String,
        email: String,
        password: String
    },
};


declare namespace Cypress {
    interface Chainable {
        fillUserForm(): Chainable<void>;//rellenar formulario alta usuario
        fillSignupForm(): Chainable<void>;
        UserLogin(): Chainable<void>; //rellena el formulario de login
        verifyLoginAccountVisible(): Chainable<void>; //verifica que la cuenta de usuario esté visible
        fillContactUsForm(): Chainable<void>; //rellena el formulario de contacto
        subscribeWithEmail(): Chainable<void>; //rellena el footer de suscripcion con el mail de mi .json
        clickAddToCartByProductId(id: number): Chainable<void>; // Agrega un producto al carrito por su ID
        clickAddToCartByProductIdPASS(id: number): Chainable<void>; // Agrega un producto al carrito por su ID
        verifySearchResultsMatchApi(searchTerm: string): Chainable<void>; // Verifica que los resultados de búsqueda coincidan con la API
        fillReviewtForm(): Chainable<void>; //rellena el formulario de contacto
        fillCardDetails(): Chainable<void>; //rellena el formulario de pago
        verifyLoginAccountVisibleUserExist(): Chainable<void>;//solo para mostar el logeo del usuario existente
        
        
        getUserDetailsByEmail(email: string): Chainable<Cypress.Response>; //obtiene los detalles del usuario por email
        registerUserWithAPI(): Chainable<Cypress.Response>;// Devuelve la respuesta de la API
        deleteUserWithAPI(): Chainable<Cypress.Response>; // Elimina un usuario y devuelve la respuesta de la API
        UserLoginCredencialesInvalidas(): Chainable<Cypress.Response>; //rellena el formulario de login con credenciales invalidas
        UserLoginSinEmailParametro(): Chainable<Cypress.Response>; //rellena el formulario de login sin email
        deleteUserIfExists(): Chainable<Cypress.Response>; // Elimina un usuario si existe
        VerifyLoginApi(): Chainable<Cypress.Response>; //verifica el login por API
        verifyLoginInvalidAPI(): Chainable<Cypress.Response>; //verifica el login por API con credenciales invalidas
        VerifyLoginWithOutEmailParameterAPI(): Chainable<Cypress.Response>; //verifica el login por API sin email
        SearchProductWithoutParameter():Chainable<Cypress.Response>;//Buscar producto sin parametro (producto)
    }
}
