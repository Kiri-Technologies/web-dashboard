describe("trayek test", () => {
    it("Successfully access the trayek page", () => {
      // Login
      cy.visit("/login");
      cy.url().should("to.equal", "http://localhost:8080/login");
      cy.get("#email").type("admin@kiri.id");
      cy.get("#password").type("password");
      cy.get("button").click();
      cy.url().should("to.equal", "http://localhost:8080/");

      cy.visit("/trayekangkot");
      cy.url().should("to.equal", "http://localhost:8080/trayekangkot");
      cy.get('span').should("to.contain", "Trayek");
      cy.get('span').should("to.contain", "List Trayek yang Tersedia");
    });

  it("Successfully create new trayek", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/trayekangkot");
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

    cy.get("a.btn-primary").click();
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot/create");

    cy.get("#kodeTrayek").type("D-01");
    cy.get("#titikAwal").type("Kebayoran Baru");
    cy.get("#latTitikAwal").type("-6.239817291376805");
    cy.get("#longTitikAwal").type("106.8014666516856");
    cy.get("#titikAkhir").type("Ciputat");
    cy.get("#latTitikAkhir").type("-6.313598325253743");
    cy.get("#longTitikAkhir").type("106.74686784713822");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "Berhasil menambahkan trayek");
  });

  it("failed to create new trayek", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/trayekangkot");
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

    cy.get("a.btn-primary").click();
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot/create");

    cy.get("#kodeTrayek").type("D-01");
    cy.get("#titikAwal").type("Kebayoran Baru");
    cy.get("#latTitikAwal").type("this is not a latitude");
    cy.get("#longTitikAwal").type("this is not a longitude");
    cy.get("#titikAkhir").type("Ciputat");
    cy.get("#latTitikAkhir").type("this is not a latitude");
    cy.get("#longTitikAkhir").type("this is not a longitude");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "Pastikan form terisi dengan benar");
  });

  it("Successfully update a trayek", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/trayekangkot");
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

    cy.get("a[href*='update']")
      .last()
      .click();

    cy.url().should("to.contain", "/update");

    cy.get("#kodeTrayek").clear().type("AD-01");

    cy.get("button.btn-primary").click();
    cy.get('span').should("to.contain", "Berhasil mengubah trayek");
  });

  it("Successfully access the detail trayek page", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/trayekangkot");
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

    cy.get("a[href*='detail']")
      .last()
      .click();

    cy.url().should("to.contain", "/detail");
    cy.get('span').should("to.contain", "Detail Trayek");
    cy.get('span').should("to.contain", "Melihat Detail Trayek Terpilih");
  });

  it("Successfully delete a trayek", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/trayekangkot");
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

    cy.get("a[href*='delete']")
      .last()
      .click();
    cy.get("a[href='#'][id*=delete].btn-delete")
      .last()
      .click();
    cy.get('span').should("to.contain", "Berhasil menghapus trayek");
  });
});
