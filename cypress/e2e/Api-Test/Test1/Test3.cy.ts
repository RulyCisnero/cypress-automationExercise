

describe('API 3: Get All Brands List', () => {
    it('API 3: Get All Brands List', () => {
        cy.request({
            method: 'GET',
            url: "https://automationexercise.com/api/brandsList",
        }).then((res) => {
            // Convertimos la respuesta a un objeto
            const parsedBody = JSON.parse(res.body);
            // Validamos que la API devuelve un responseCode 200
            expect(parsedBody.responseCode).to.equal(200);
            // Verificamos que la lista de productos no sea null y sea un array
            expect(parsedBody.brands).to.not.be.null;
            expect(parsedBody.brands).to.be.an("array").that.is.not.empty;

            parsedBody.brands.forEach((marcas)=>{
                expect(marcas).to.be.an("object");
                expect(marcas).to.have.all.keys("id","brand");
            });
        });
    });
});