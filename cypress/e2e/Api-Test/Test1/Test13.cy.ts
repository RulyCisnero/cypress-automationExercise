describe('API 13: PUT METHOD To Update User Account', () => {
    it('API 13: PUT METHOD To Update User Account', () => {
        cy.request({
            method: 'PUT',
            url: "",
            failOnStatusCode: false,
            form:true,
            body: {
                name: "NuevoUsuario",
                email: "Rec@gmail.com",
                password: "123456",

                title: "Mr",
                birth_date: "27",
                birth_month: "10",
                birth_year: "2000",

                firstname: "Rafael",
                lastname: "rafinhia",

                company: "Globant",
                address1: "Peru",
                address2: "157",

                country: "Argentina",
                zipcode: "8150",
                state: "Buenos Aires",
                city: "Sierra de la ventana",

                mobile_number: "123456789",
                },
        }).then((res) => {
            const parsedBody = JSON.parse(res.body);

            // Validación del responseCode
            expect(parsedBody.responseCode).to.equal(200);

            // Otras validaciones opcionales
            expect(parsedBody.message).to.equal("User updated!");
        });
    });
});