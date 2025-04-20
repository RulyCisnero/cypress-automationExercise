describe('API 9: DELETE To Verify Login', () => {
    it('API 9: DELETE To Verify Login', () => {
        cy.request({
            method: 'DELETE',
            url: " https://automationexercise.com/api/verifyLogin",
            failOnStatusCode: false
        }).then((res) => {
            const parsedBody = JSON.parse(res.body);
            // Validación del responseCode
            expect(parsedBody.responseCode).to.equal(405);
            // Otras validaciones opcionales
            expect(parsedBody.message).to.equal("This request method is not supported.")
        });
    });
});