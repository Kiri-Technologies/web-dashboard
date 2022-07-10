describe("Premium user test", () => {
  it("Successfully access the premium user page", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/premiumuser");
    cy.url().should("to.equal", "http://localhost:8080/premiumuser");
    cy.get("span").should("to.contain", "User Premium");
    cy.get("span").should("to.contain", "List User Premium yang Terdaftar");
  });

  it("Successfully create new premium user", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/premiumuser");
    cy.url().should("to.equal", "http://localhost:8080/premiumuser");

    cy.get("a.btn-primary").click();
    cy.url().should("to.equal", "http://localhost:8080/premiumuser/create");

    cy.get("#userId").type("user-123456");
    cy.get("#paymentDate").type("2022-07-01");
    cy.get("#from").type("2022-07-01");
    cy.get("#to").type("2022-08-01");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "Berhasil menambahkan premium user");
  });

  it("failed to create new premium user", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/premiumuser");
    cy.url().should("to.equal", "http://localhost:8080/premiumuser");

    cy.get("a.btn-primary").click();
    cy.url().should("to.equal", "http://localhost:8080/premiumuser/create");

    cy.get("#userId").type("this is a wrong user id");
    cy.get("#paymentDate").type("2022-07-01");
    cy.get("#from").type("2022-07-01");
    cy.get("#to").type("2022-08-01");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "User tidak ditemukan");

    cy.get("#userId").clear().type("user-123456");
    cy.get("#paymentDate").clear().type("2022-07-01");
    cy.get("#from").clear().type("2022-07-01");
    cy.get("#to").clear().type("2022-06-01");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "Tanggal From tidak boleh melebihi To");
  });

  it("Successfully update a premium user", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/premiumuser");
    cy.url().should("to.equal", "http://localhost:8080/premiumuser");

    cy.get("a[href*='update']")
      .last()
      .click();

    cy.url().should("to.contain", "/update");

    cy.get("#to")
      .clear()
      .type("2022-09-01");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "Berhasil mengubah premium user");
  });

  it("Successfully delete a premium user", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/premiumuser");
    cy.url().should("to.equal", "http://localhost:8080/premiumuser");

    cy.get("a[href*='delete']")
      .last()
      .click();
    cy.get("a[href='#'][id*=delete].btn-delete")
      .last()
      .click();
    cy.get("span").should("to.contain", "Berhasil menghapus premium user");
  });
});
