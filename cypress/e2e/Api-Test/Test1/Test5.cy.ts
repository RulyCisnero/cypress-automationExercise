describe('API 5: POST To Search Product', () => {
    const searchTerm = 'tshirt'; // ✅ lo podés cambiar en un test combinado

    it(`Devuelve productos que coincidan con "${searchTerm}"`, () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct',
            failOnStatusCode: false,
            form: true,
            body: {
                search_product: searchTerm
            }
        }).then((res) => {
            const parsedBody = JSON.parse(res.body);
            expect(parsedBody.responseCode).to.equal(200);
            expect(parsedBody.products).to.be.an('array').that.is.not.empty;

            parsedBody.products.forEach((product) => {
                expect(product.name.toLowerCase()).to.include(searchTerm.toLowerCase());
            });
        });
    });
});

