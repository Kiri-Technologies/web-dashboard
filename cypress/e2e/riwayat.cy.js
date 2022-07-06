describe("View riwayat test", () => {
  it("Successfully access the riwayat pendapatan page", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/riwayatpendapatan");
    cy.url().should("to.equal", "http://localhost:8080/riwayatpendapatan");
  });

  it("Successfully access the riwayat perjalanan page", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/riwayatperjalanan");
    cy.url().should("to.equal", "http://localhost:8080/riwayatperjalanan");
  });
});
