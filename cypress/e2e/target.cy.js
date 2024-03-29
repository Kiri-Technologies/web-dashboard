describe("Change target test", () => {
  it("Successfully access the change target page", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/changetarget");
    cy.url().should("to.equal", "http://localhost:8080/changetarget");
  });

  it("Successfully change one of the target", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/changetarget");
    cy.url().should("to.equal", "http://localhost:8080/changetarget");

    cy.get('a[href="/changetarget/1/update"]').click();
    cy.url().should("to.equal", "http://localhost:8080/changetarget/1/update");

    cy.get("#input")
      .clear()
      .type("500000");
    cy.get("#target")
      .clear()
      .type("500000");
    cy.get("button").click();

    cy.url().should("to.equal", "http://localhost:8080/changetarget");
    cy.get('span').should("to.contain", "Berhasil mengubah target");
  });

  it("Failed to change one of the target", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/changetarget");
    cy.url().should("to.equal", "http://localhost:8080/changetarget");

    cy.get('a[href="/changetarget/1/update"]').click();
    cy.url().should("to.equal", "http://localhost:8080/changetarget/1/update");

    cy.get("#input")
      .clear()
      .type(-100);
    cy.get("#target")
      .clear()
      .type("500000");
    cy.get("button").click();

    cy.get('span').should("to.contain", "Pastikan form terisi dengan benar");
  });
});
