/// <reference path="../support/index.d.ts" />

describe("Login Page Test", () => {

    beforeEach(() => {
        cy.visit("/sections/auth")

        cy.fixture("user.json").as("userData");
    });

    it("Load Login Page", () => {
        cy.get("form ion-item").should("have.length", 2);
        cy.get("form ion-button").should("exist");
        cy.get("form .wrapper-link").should("exist");
    });

    it("Form Login required fields", () => {
        cy.get("form input[type='email']").type(" ").clear();
        cy.get("form input[type='password']").type(" ").clear();

        cy.get("form ion-button[type='submit']").should("have.attr", "disabled", "disabled");

        cy.get(".label-error").each(label => {
            expect(label.text()).equal("Campo obligatorio");
        });
    });

    it("Form Login Invalid Credentials", () => {
        cy.get("@userData").then(userData => {
            cy.loginUser(userData["noExists"]["email"], userData["noExists"]["password"], 2000);
            cy.get("ion-toast").should("exist");
        });
    });

    it("Form Login Valid Credentials", () => {
        cy.get("@userData").then(userData => {
            cy.loginUser(userData["exists"]["email"], userData["exists"]["password"], 0);
            cy.contains("Favoritos").should("exist");
            cy.url().should('eq', Cypress.env("urlSite"));
        });
    });

    it("Go to register", () => {
        cy.get(".wrapper-link a").click();
        cy.contains("Registrarse").should("exist");
    });

});
