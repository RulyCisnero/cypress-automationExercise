describe("API Test - Obtener lista de productos", () => {
    it("API 1: Get All Products List", () => {
      cy.request({
        method: "GET",
        url: "https://automationexercise.com/api/productsList",
        failOnStatusCode: false,
      }).then((res) => {
        // Convertimos la respuesta a un objeto
        const parsedBody = JSON.parse(res.body);
  
        // Validamos que la API devuelve un responseCode 200
        expect(parsedBody.responseCode).to.eq(200);
  
        // Verificamos que la lista de productos no sea null y sea un array
        expect(parsedBody.products).to.not.be.null;
        expect(parsedBody.products).to.be.an("array").that.is.not.empty;
  
        // Verificamos que cada producto tenga las claves esperadas
        parsedBody.products.forEach((product) => {
          expect(product).to.be.an("object");
          expect(product).to.have.all.keys("brand", "category", "id", "name", "price");
        });
      });
    });
  });
  