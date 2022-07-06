describe("Approval angkot test", () => {
  it("Successfully access the approval angkot page", async () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/approveangkot");
    cy.url().should("to.equal", "http://localhost:8080/approveangkot");
  });

  it("Successfully approve angkot", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/approveangkot");
    cy.url().should("to.equal", "http://localhost:8080/approveangkot");

    cy.get('#approve').click();
    cy.contains('Berhasil update status angkot menjadi approved');
  });

  it("Successfully decline angkot", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/approveangkot");
    cy.url().should("to.equal", "http://localhost:8080/approveangkot");

    cy.get('#decline').click();
    cy.contains('Berhasil update status angkot menjadi declined');
  });
});
