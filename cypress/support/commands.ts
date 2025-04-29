/// <reference types="cypress" />

import 'cypress-file-upload';

import { LoginPage } from "../support/LoginPage/LoginPage";
import { ContactPage } from "./ContactPage/ContactPage";
import { FooterPage } from "./FooterPage/FooterPage";
import { PaymentPage } from "./PaymentPage/PaymentPage";
import { ReviewProductPage } from "./ProductPage/ReviweProduct";

/**
 * Llena el formulario de inicio de sesión con las credenciales de usuario validas.
 * @param {Object} user - Objeto que contiene correo electrónico y contraseña.
 */
Cypress.Commands.add("UserLogin", () => {
  cy.fixture("user.json").then((user) => {
    const loginPage = new LoginPage();
    loginPage.enterEmailAndPassword(user.existingUser.email, user.existingUser.password);
  });
});


/**
* Rellena el formulario de login con credenciales inválidas.
* @param {Object} user - Objeto que contiene el email del usuario.
* @param {string} user.existingUser.password - El password del usuario.
* @param {string} - Email inválido
* @param user Objeto con los datos del usuario.
*/
Cypress.Commands.add("UserLoginCredencialesInvalidas", () => {
  cy.fixture("user.json").then((user) => {
    const signupPage = new LoginPage();
    signupPage.enterEmailAndPassword("invalid_user@example.com", user.existingUser.password);
    //verifyLoginInvalidAPI();
  });
});

/**
* Rellena el formulario de login sin email.
* @param {Object} user - Objeto que contiene el email del usuario.
* @param {string} user.password - El password del usuario.
* @param user Objeto con los datos del usuario.
*/
Cypress.Commands.add("UserLoginSinEmailParametro", () => {
  cy.fixture("user.json").then((user) => {
    const signupPage = new LoginPage();
    signupPage.enterEmailAndPassword(" ", user.existingUser.password);
    //VerifyLoginWithOutEmailParameterAPI();
  });
});



Cypress.Commands.add("VerifyLoginWithOutEmailParameterAPI", () => {
  cy.fixture("user.json").then((user) => {
    cy.request({
      method: 'POST',
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false,
      form: true,
      body: {
        password: user.existingUser.password
      }
    }).then((res) => {
      const parsedBody = JSON.parse(res.body);
      // Validación del responseCode
      expect(parsedBody.responseCode).to.equal(400);
      // Otras validaciones opcionales
      expect(parsedBody.message).to.equal("Bad request, email or password parameter is missing in POST request.")
    });
  });
});



/**
* Rellena el formulario de registro con los datos de un usuario.
* @param user Objeto con los datos del usuario.
*/
Cypress.Commands.add("fillUserForm", () => {
  cy.fixture("user.json").then((user) => {
    const loginPage = new LoginPage();
    loginPage.verifyNewUserSignupVisible();
    loginPage.enterNameAndEmail(user.name, user.email);
    loginPage.clickSignupButton();
    loginPage.verifyAccountInfoFormVisible();
    if (user.gender === 'Mr') {
      loginPage.clickTitleMr();
    } else {
      loginPage.clickTitleMrs();
    }
    loginPage.enterPassword(user.password);
    loginPage.birthdate(user.day, user.month, user.year);
    loginPage.checkNewsletterAndSpecialOffers();
    loginPage.addressInfo(
      user.firstName,
      user.lastName,
      user.company,
      user.address,
      user.address2,
      user.country,
      user.state,
      user.city,
      user.zipcode,
      user.mobileNumber);
  })
});
/**
 * ESTE COMANDO ES UNICO PARA LOGEO CON CUENTA EXISTENTE
 * SE USA SOLAMENTE PARA INICIAR SESION SIN TENER QUE ELIMINAR LA CUENTA
 * Verifica que la cuenta de usuario esté visible.
 * @param {Object} user - Objeto que contiene el nombre del usuario.
 * @param {string} user.existingUser.name - El nombre del usuario.
 */
Cypress.Commands.add("verifyLoginAccountVisibleUserExist", () => {
  cy.fixture("user.json").then((user) => {
    const signupPage = new LoginPage();
    signupPage.verifyLoggedInUser(user.existingUser.name);
  });
});



/**
 * 
 * Verifica que la cuenta de usuario esté visible.
 * @param {Object} user - Objeto que contiene el nombre del usuario.
 * @param {string} user.name - El nombre del usuario.
 */
Cypress.Commands.add("verifyLoginAccountVisible", () => {
  cy.fixture("user.json").then((user) => {
    const signupPage = new LoginPage();
    signupPage.verifyLoggedInUser(user.name);
  });
});

/**
* Rellena el formulario de contacto con los datos de un usuario.
* @param user Objeto con los datos del usuario.
*/
Cypress.Commands.add("fillContactUsForm", () => {
  cy.fixture("user.json").then((user) => {
    const signupPage = new ContactPage();
    signupPage.enterNameAndEmailContactUs(user.name, user.email);
    signupPage.enterSubjectAndMessage("aca dejo mi mensaje de contacto para el equipo de soporte", "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  });
});

/**
* Rellena el formulario de reseña de producto con los datos de un usuario.
* @param user Objeto con los datos del usuario.
* @param {string} user.name - El nombre del usuario.
* @param {string} user.email - El email del usuario.
* @param {string} user.review - El mensaje de reseña del usuario.
*/
Cypress.Commands.add("fillReviewtForm", () => {
  cy.fixture("user.json").then((user) => {
    const review = new ReviewProductPage();
    review.enterNameAndEmailReview(user.name, user.email, "el producto es muy bueno, lo recomiendo");
  });
});

/**
* Verifica el inicio de sesión a través de la API.
* @param {Object} user - Objeto que contiene el email y password del usuario.
* @param {string} user.email - El email del usuario.
* @param {string} user.password - El password del usuario.
* @param user Objeto con los datos del usuario.
*/
Cypress.Commands.add('VerifyLoginApi', () => {
  cy.fixture("user.json").then((user) => {
    cy.request({
      method: 'POST',
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false,
      form: true,
      body: {
        email: user.email,
        password: user.password
      }
    }).then((res) => {
      const parsedBody = JSON.parse(res.body);
      expect(parsedBody.responseCode).to.equal(200);
      expect(parsedBody.message).to.equal("User exists!")
    });
  });
});

/**
* Rellena el footer de suscripción con el email de un usuario.
* @param {Object} user - Objeto que contiene el email del usuario.
* @param {string} user.email - El email del usuario.
* @param user Objeto con los datos del usuario.
*/
Cypress.Commands.add('subscribeWithEmail', () => {
  cy.fixture('user.json').then((user) => {
    const footer = new FooterPage();
    footer.enterEmailAndClickSubscribe(user.email);
  });
});

/**
* Rellena el formulario de pago con los detalles de la tarjeta.
* @param {Object} user - Objeto que contiene los detalles de la tarjeta.
* @param {string} user.name - Nombre del titular de la tarjeta.
* @param {string} user.number - Número de la tarjeta.
* @param {string} user.cvc - Código de seguridad de la tarjeta.
* @param {string} user.month - Mes de vencimiento de la tarjeta.
* @param {string} user.year - Año de vencimiento de la tarjeta.
*/
Cypress.Commands.add('fillCardDetails', () => {
  const paymentPage = new PaymentPage();
  cy.fixture("user.json").then((user) => {
    paymentPage.fillCardDetails({
      name: user.payment.name,
      number: user.payment.number,
      cvc: user.payment.cvc,
      month: user.payment.month,
      year: user.payment.year
    });
  });
});


/**
* Registra un nuevo usuario a través de la API.
* @param {Object} user - Objeto que contiene los datos del usuario.
*/
Cypress.Commands.add("registerUserWithAPI", () => {
  cy.fixture("user.json").then((user) => {
    return cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/createAccount",
      failOnStatusCode: false,
      form: true,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.gender,
        birth_date: (user.day),
        birth_month: (user.month),
        birth_year: (user.year),
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobileNumber,
      },
    }).then((response) => {
      const parsedBody = JSON.parse(response.body);
      // Validación del responseCode
      expect(parsedBody.responseCode).to.eq(201);
      // Otras validaciones opcionales
      expect(parsedBody.message).to.eq("User created!")
    });
  });
});

/**
* 'API 14: GET user account detail by email'* 
* obtiene los detalles del usuario por email
* @param {string} email - El email del usuario a verificar.
*/
Cypress.Commands.add('getUserDetailsByEmail', (email: string) => {
  cy.request({
    method: 'GET',
    url: `https://automationexercise.com/api/getUserDetailByEmail?email=${email}`,
    //url: 'https://automationexercise.com/api/getUserDetailByEmail',  // URL base
    failOnStatusCode: false,
    qs: { email },  // El email como parámetro en la query string
  }).then((res) => {
    expect(res.status).to.eq(200);
    const parsedBody = JSON.parse(res.body);
    expect(parsedBody.responseCode).to.equal(200);
    expect(parsedBody.message).to.eq('User exists!');

    //  expect(parsedBody.message).to.equal("User Detail");
    // Podés loguear info útil si querés
    cy.log(`✅ Usuario encontrado: ${parsedBody.user.name}`);
  });
});

/**
* Elimina un usuario a través de la API.
* @param {Object} user - Objeto que contiene los datos del usuario.
*/
Cypress.Commands.add("deleteUserWithAPI", () => {
  cy.fixture("user.json").then((user) => {
    return cy.request({
      method: "DELETE",
      url: "https://automationexercise.com/api/deleteAccount",
      failOnStatusCode: false,
      form: true,
      body: {
        email: user.email,
        password: user.password,
      },
    }).then((res) => {
      cy.log("DELETE response:", res.body); // 🔥 Log para depurar
      const parsedBody = JSON.parse(res.body);
      expect(parsedBody.responseCode).to.equal(200);
      expect(parsedBody.message).to.equal("Account deleted!");
    });
  });
});


/**
* deleteUserIfExists refactorizado para usar la API de eliminación.
* 1. Consulta si el usuario existe.
* 2. Si existe, lo elimina.
* 3. Si no existe, no hace nada.
* @param {Object} user - Objeto que contiene el email del usuario.
*/
Cypress.Commands.add("deleteUserIfExists", () => {
  cy.fixture("user.json").then((user) => {
    return cy.request({
      method: "DELETE",
      url: "https://automationexercise.com/api/deleteAccount",
      failOnStatusCode: false,
      form: true,
      body: {
        email: user.email,
        password: user.password,
      },
    }).then((res) => {
      cy.log("DELETE response:", res.body);

      // Intentamos parsear con try/catch por si no es JSON válido
      let parsedBody;
      try {
        parsedBody = JSON.parse(res.body);
      } catch (e) {
        cy.log("⚠ No se pudo parsear la respuesta:", res.body);
        return;
      }

      switch (parsedBody.responseCode) {
        case 200:
          expect(parsedBody.message).to.equal("Account deleted!");
          cy.log("✔ Usuario eliminado correctamente");
          break;
        case 400:
          cy.log("⚠ Usuario no encontrado. No se requiere eliminación");
          break;
        case 404:
          cy.log("❌ Ruta no encontrada para eliminar usuario (404)");
          break;
        default:
          cy.log("❓ Código de respuesta no esperado:", parsedBody.responseCode);
          break;
      }
    });
  });
});


/**
* Agrega un producto al carrito por su ID
* Esta función busca el producto por su ID y hace clic en "Add to cart"
* Asegúrate de que el ID del producto sea correcto y que el producto esté visible en la página
* @param {string | number} id - ID del producto a agregar al carrito.
*/
Cypress.Commands.add("clickAddToCartByProductIdPASS", (id: string | number) => {
  cy.get(`.single-products:has([data-product-id="${id}"])`).then(($el) => {
    const overlay = $el.find('.product-overlay')[0];

    // Forzar visibilidad manualmente
    overlay.style.display = 'block';

    // Ahora hacer click
    cy.wrap(overlay)
      .find('.add-to-cart')
      .click({ force: true });
  });
});

/**
* Agrega un producto al carrito por su ID
* Esta función busca el producto por su ID y hace clic en "Add to cart"
* Asegúrate de que el ID del producto sea correcto y que el producto esté visible en la página
* @param {string | number} id - ID del producto a agregar al carrito.
*/
//NO ANDA REVISAR
Cypress.Commands.add("clickAddToCartByProductId", (id: number) => {
  cy.get(`.single-products:has([data-product-id="${id}"])`)
    .trigger('mouseover')
    .then($product => {
      const overlay = $product.find('.product-overlay')[0];

      // Forzar visibilidad del overlay si está oculto
      overlay.style.display = 'block';
      overlay.style.visibility = 'visible';

      // Espera mínima para asegurar el render
      cy.wait(100);

      // Click robusto
      cy.wrap(overlay)
        .find('.add-to-cart')
        .should('be.visible')
        .click({ force: true });
    });
});


/**
* Verifica que los productos mostrados en la UI coincidan con los devueltos por la API
* @param searchTerm término usado en la búsqueda
*/
Cypress.Commands.add('verifySearchResultsMatchApi', (searchTerm: string) => {
  cy.get('.features_items .productinfo p').then(($uiProducts) => {
    // Convertimos $uiProducts a un arreglo antes de usar map
    const uiNames = $uiProducts.toArray().map((p: HTMLElement) => p.innerText.trim().toLowerCase());
    //const uiNames = [...$uiProducts].map(p => p.innerText.trim().toLowerCase());

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/searchProduct',
      failOnStatusCode: false,
      form: true,
      body: {
        search_product: (searchTerm)
      }
    }).then((res) => {
      const parsedBody = JSON.parse(res.body);
      expect(parsedBody.responseCode).to.equal(200);
      expect(parsedBody.products).to.be.an('array').that.is.not.empty;

      const apiNames = parsedBody.products.map(p =>
        p.name.trim().toLowerCase()
      );

      const coincidencias = uiNames.filter(uiName =>
        apiNames.some(apiName => apiName.includes(uiName) || uiName.includes(apiName))
      );

      expect(coincidencias.length, 'Coincidencias entre UI y API').to.be.greaterThan(0);
    });
  });
});

Cypress.Commands.add('verifyLoginInvalidAPI', () => {
  cy.fixture("user.json").then((user) => {
    cy.request({
      method: 'POST',
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false,
      form: true,
      body: {
        email: "invalid_user@example.com",
        password: user.password
      }
    }).then((res) => {
      const parsedBody = JSON.parse(res.body);
      // Validación del responseCode
      cy.log("✅entrei a la API de login con credenciales invalidas");
      expect(parsedBody.responseCode).to.equal(404);
      // Otras validaciones opcionales
      expect(parsedBody.message).to.equal("User not found!")
    });
  });
});

/**
* Verifica que la búsqueda de productos sin el parámetro 'search_product' devuelva un error 400
* @param 
* no se le pasan parametros
*/

Cypress.Commands.add('SearchProductWithoutParameter', () => {
  cy.request({
    method: 'POST',
    url: "https://automationexercise.com/api/searchProduct",
    failOnStatusCode: false,
    form: true,
    body: {
      // No se pasa el parámetro search_product
    }
  }).then((res) => {
    const parsedBody = JSON.parse(res.body);
    // Validación del responseCode
    expect(parsedBody.responseCode).to.equal(400);
    // Otras validaciones opcionales
    expect(parsedBody.message).to.equal("Bad request, search_product parameter is missing in POST request.");
  });
});
