describe("Login test", () => {
  it("Successfully login", () => {
    cy.visit("/login");

    cy.url().should("to.equal", "http://localhost:8080/login");

    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();

    cy.url().should("to.equal", "http://localhost:8080/");
  });

  it("Failed login", () => {
    cy.visit("/login");

    cy.url().should("to.equal", "http://localhost:8080/login");

    cy.get("#email").type("dummyacc@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();

    cy.get('span').should("to.contain", "Email atau password tidak sesuai");
  });
});
