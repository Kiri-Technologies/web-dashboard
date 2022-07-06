describe("Profile test", () => {
  it("Successfully access the profile page", async () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.get("div.btn.btn-ghost.btn-sm").click();
    cy.get("ul.menu.dropdown-content").should("be.visible");

    cy.get('a[href="/account"]').click();
    cy.url().should("to.equal", "http://localhost:8080/account");
  });

  it("Successfully change the profile name", async () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/account");
    cy.url().should("to.equal", "http://localhost:8080/account");

    cy.get("button.btn-primary").click();

    cy.get("#name")
      .clear()
      .type("admin 2");

    cy.get("button.btn-primary").click();
    cy.contains("Berhasil mengubah profil");
  });

  it("Failed to change the email", async () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/account");
    cy.url().should("to.equal", "http://localhost:8080/account");

    cy.get("button.btn-primary").click();

    cy.get("#email")
      .clear()
      .type("adul@gmail.com");

    cy.get("button.btn-primary").click();
    cy.contains("Email sudah terdaftar");
  });

  it("Successfully change the password", async () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/account");
    cy.url().should("to.equal", "http://localhost:8080/account");

    cy.get("button.btn-primary").click();

    cy.get("#password")
      .clear()
      .type("password1");

    cy.get("#ulangiPassword")
      .clear()
      .type("password1");

    cy.get("button.btn-primary").click();
    cy.url().should("to.equal", "http://localhost:8080/login");
  });

  it("Failed to change the password", async () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/account");
    cy.url().should("to.equal", "http://localhost:8080/account");

    cy.get("button.btn-primary").click();

    cy.get("#password")
      .clear()
      .type("password1");

    cy.get("#ulangiPassword")
      .clear()
      .type("asdasdasd");

    cy.get("button.btn-primary").click();
    cy.contains("Password dan konfirmasi password harus sesuai");
  });
});
