describe('POST -En toda las listas de productos ', ()=>{
    it('API 2: POST To All Products List',()=>{
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/productsList",
            failOnStatusCode: false
         }).then((res)=>{
            // Convertimos la respuesta a un objeto
            const parsedBody = JSON.parse(res.body);
            // Verificamos que el código de respuesta sea 405
            expect(parsedBody.responseCode).to.equal(405)
            // Verificamos el mensaje de respuesta
            expect(parsedBody.message).to.equal("This request method is not supported.")
         })
    })
})