export function verifyLoginAPI() {
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
        // Validación del responseCode
        expect(parsedBody.responseCode).to.equal(200);
        // Otras validaciones opcionales
        expect(parsedBody.message).to.equal("User exists!")
    });
 });
}
