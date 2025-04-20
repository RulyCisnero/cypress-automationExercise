describe('API 10: POST To Verify Login with invalid details', () => {
    it('API 10: POST To Verify Login with invalid details', () => {
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
});    
