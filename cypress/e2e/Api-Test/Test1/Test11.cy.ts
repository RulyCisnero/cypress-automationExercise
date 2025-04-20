describe('API 11: POST To Create/Register User Account', () => {
    it('API 11: POST To Create/Register User Account', () => {
        cy.fixture("user.json").then((user) => {
            cy.request({
                method: 'POST',
                url: "https://automationexercise.com/api/createAccount",
                failOnStatusCode: false,
                form: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: ({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    title: user.gender,
                    birth_date: user.day,
                    birth_month: user.month,
                    birth_year: user.year,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    company: user.company,
                    address1: user.address,
                    address2: user.address2,
                    country: user.country,
                    zipcode: user.zipcode,
                    state: user.state,
                    city: user.city,
                    mobile_number: user.mobileNumber,
                }),
            }).then((res) => {
                const parsedBody = JSON.parse(res.body);
                expect(parsedBody.responseCode).to.eq(201);
                expect(parsedBody.message).to.eq("User created!")
            });
        });
    });
});