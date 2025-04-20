describe('API 14: GET user account detail by email', () => {
    it('API 14: GET user account detail by email', () => {
        cy.request({
            method: 'GET',
            url: " https://automationexercise.com/api/getUserDetailByEmail",
            failOnStatusCode: false,
            form: true,
            body:{
                email:"email@test.com"
                },
        }).then((res) => {
            const parsedBody = JSON.parse(res.body);
            // Validación del responseCode
            expect(parsedBody.responseCode).to.equal(200);
            // Otras validaciones opcionales
            expect(parsedBody.message).to.equal("User Detail")
        });
    });
});