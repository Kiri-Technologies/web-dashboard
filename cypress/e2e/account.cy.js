describe("Manage account test", () => {
  it("Successfully access the manage account", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/manageaccount");
    cy.url().should("to.equal", "http://localhost:8080/manageaccount");
  });

  it("Successfully create new account", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/manageaccount");
    cy.url().should("to.equal", "http://localhost:8080/manageaccount");

    cy.get("a.btn-primary").click();
    cy.url().should("to.equal", "http://localhost:8080/manageaccount/create");

    cy.get("#email").type("dummy@gmail.com");
    cy.get("#name").type("dummy");
    cy.get("#phoneNumber").type("081212341234");
    cy.get("#birthdate").type("2000-01-01");
    cy.get("#password").type("password");
    cy.get("#ulangiPassword").type("password");

    cy.get("button.btn-primary").click();
    cy.get('span').should("to.contain", "Berhasil menambahkan akun");
  });

  it("Successfully update an account", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/manageaccount");
    cy.url().should("to.equal", "http://localhost:8080/manageaccount");

    cy.get("a[href*='update']")
      .first()
      .click();

    cy.url().should("to.contain", "/update");

    cy.get("#name")
      .clear()
      .type("dummy 2");
    cy.get("#password")
      .clear()
      .type("password");
    cy.get("#ulangiPassword")
      .clear()
      .type("password");

    cy.get("button.btn-primary").click();
    cy.get('span').should("to.contain", "Berhasil mengubah akun");
  });

  it("Successfully delete an account", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/manageaccount");
    cy.url().should("to.equal", "http://localhost:8080/manageaccount");

    cy.get("a[href*='delete']")
      .first()
      .click();
    cy.get("a[href='#'][id*=delete].btn-delete")
      .first()
      .click();
    cy.get('span').should("to.contain", "Berhasil menghapus akun");
  });
});
