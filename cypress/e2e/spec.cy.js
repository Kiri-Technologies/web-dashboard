describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.url().should('to.equal', 'https://example.cypress.io/commands/actions');
  });
});
