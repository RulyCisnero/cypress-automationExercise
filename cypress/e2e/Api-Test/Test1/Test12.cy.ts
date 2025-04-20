describe('API 12: DELETE METHOD To Delete User Account', () => {
    it('API 12: DELETE METHOD To Delete User Account', () => {
        cy.request({
            method: 'DELETE',
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                  email: "mail@eliminar.com",
                  password: "passwordeliminar"
                 },
        }).then((res) => {
            const parsedBody = JSON.parse(res.body);

            // Validación del responseCode
            expect(parsedBody.responseCode).to.equal(200);

            // Otras validaciones opcionales
            expect(parsedBody.message).to.equal("Account deleted!")
        });
    });
});