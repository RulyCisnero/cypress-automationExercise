describe('API 8: POST To Verify Login without email parameter', () => {
    it('API 8: POST To Verify Login without email parameter', () => {
        cy.fixture("user.json").then((user) => {
            cy.request({
                method: 'POST',
                url: "https://automationexercise.com/api/verifyLogin",
                failOnStatusCode: false,
                form: true,
                body: {
                    password: user.password
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
});
