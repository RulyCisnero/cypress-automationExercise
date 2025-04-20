describe('API 6: POST To Search Product without search_product parameter', () => {
    it('API 6: POST To Search Product without search_product parameter', () => {
        cy.request({
            method: 'POST',
            url: "https://automationexercise.com/api/searchProduct",
            failOnStatusCode: false
        }).then((res) => {
            const parsedBody = JSON.parse(res.body);
            // Validación del responseCode
            expect(parsedBody.responseCode).to.equal(400);
            // Otras validaciones opcionales
            expect(parsedBody.message).to.equal("Bad request, search_product parameter is missing in POST request.");
        });
    });
});