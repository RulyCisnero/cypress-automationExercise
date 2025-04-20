describe('API 4: PUT To All Brands List',()=>{
    it('API 4: PUT To All Brands List',()=>{
        cy.request({
            method: 'PUT',
            url:"https://automationexercise.com/api/brandsList",
            failOnStatusCode: false
        }).then((res) => {
          // Convertimos la respuesta a un objeto  
           const parsedBody = JSON.parse(res.body);
          // Validamos que la API devuelve un responseCode 405
          expect(parsedBody.responseCode).to.equal(405);
          // Verificamos el mensaje de respuesta
          expect(parsedBody.message).to.equal("This request method is not supported.");
        });
    });
});