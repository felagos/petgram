/// <reference types="Cypress" />

describe("Home test", () => {

    beforeEach(() =>  cy.visit("/"));

    it("Load Home Page", () => {
        cy.get("app-slide-category").should("have.length", 1);
        cy.get("app-scroll-pets ion-card").should("have.length.gte", 0);
    });

});