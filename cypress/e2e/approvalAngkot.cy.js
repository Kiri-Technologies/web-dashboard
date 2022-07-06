describe("Approval angkot test", () => {
  it("Successfully access the approval angkot page", () => {
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

    cy.get("svg.fa-check-square")
      .first()
      .click();
    cy.get("a[id*='save'][id*='approve'][href*='#'].btn-success")
      .first()
      .click();
    cy.get("span").should(
      "to.contain",
      "Berhasil update status angkot menjadi approved"
    );
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

    cy.get("a[href*='decline']")
      .first()
      .click();
    cy.get("a[id*='save'][id*='decline'][href*='#'].btn-success")
      .first()
      .click();
    cy.get("span").should(
      "to.contain",
      "Berhasil update status angkot menjadi declined"
    );
  });
});
