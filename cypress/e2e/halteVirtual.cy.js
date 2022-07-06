describe("Halte virtual test", () => {
    it("Successfully access all of halte virtual data", () => {
      /// Login
      cy.visit("/login");
      cy.url().should("to.equal", "http://localhost:8080/login");
      cy.get("#email").type("admin@kiri.id");
      cy.get("#password").type("password");
      cy.get("button").click();
      cy.url().should("to.equal", "http://localhost:8080/");

      cy.visit("/trayekangkot");
      cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

      // create new trayek
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

      // Access detail trayek page
      cy.get("a[href*='detail']")
        .last()
        .click();

      cy.url().should("to.contain", "/detail");
      cy.get("span").should("to.contain", "Detail Trayek");
      cy.get("span").should("to.contain", "Melihat Detail Trayek Terpilih");
      cy.get("h1").should("to.contain", "Titik Halte Virtual");
    });

    it("Successfully create new halte virtual", () => {
      // Login
      cy.visit("/login");
      cy.url().should("to.equal", "http://localhost:8080/login");
      cy.get("#email").type("admin@kiri.id");
      cy.get("#password").type("password");
      cy.get("button").click();
      cy.url().should("to.equal", "http://localhost:8080/");

      cy.visit("/trayekangkot");
      cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

      // Access detail trayek page
      cy.get("a[href*='detail']")
        .last()
        .click();

      cy.url().should("to.contain", "/detail");
      cy.get("span").should("to.contain", "Detail Trayek");
      cy.get("span").should("to.contain", "Melihat Detail Trayek Terpilih");
      cy.get("h1").should("to.contain", "Titik Halte Virtual");

      // Create new halte virtual
      cy.get("a.btn-primary")
        .contains(" Tambah")
        .click();
      cy.get("#halteVirtualName").type("Pasar Ciputat");
      cy.get("#arah").select("Kebayoran Baru");
      cy.get("#latitude").type("-6.312394852542533");
      cy.get("#longitude").type("106.74696482847486");

      cy.get("button.btn-primary").click();

      cy.url().should("to.contain", "/detail");
      cy.get("span").should("to.contain", "Berhasil menambahkan halte virtual");
    });

    it("failed to create new halte virtual", () => {
      // Login
      cy.visit("/login");
      cy.url().should("to.equal", "http://localhost:8080/login");
      cy.get("#email").type("admin@kiri.id");
      cy.get("#password").type("password");
      cy.get("button").click();
      cy.url().should("to.equal", "http://localhost:8080/");

      cy.visit("/trayekangkot");
      cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

      // Access detail trayek page
      cy.get("a[href*='detail']")
        .last()
        .click();

      cy.url().should("to.contain", "/detail");
      cy.get("span").should("to.contain", "Detail Trayek");
      cy.get("span").should("to.contain", "Melihat Detail Trayek Terpilih");
      cy.get("h1").should("to.contain", "Titik Halte Virtual");

      // Create new halte virtual
      cy.get("a.btn-primary")
        .contains(" Tambah")
        .click();
      cy.get("#halteVirtualName").type("Pasar Ciputat");
      cy.get("#arah").select("Kebayoran Baru");
      cy.get("#latitude").type("this is not a latitude");
      cy.get("#longitude").type("this is not a longitude");

      cy.get("button.btn-primary").click();

      cy.get("span").should("to.contain", "Pastikan form terisi dengan benar");
    });

  it("Successfully update a halte virtual", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/trayekangkot");
    cy.url().should("to.equal", "http://localhost:8080/trayekangkot");

    // Access detail trayek page
    cy.get("a[href*='detail']")
      .last()
      .click();

    cy.url().should("to.contain", "/detail");
    cy.get("span").should("to.contain", "Detail Trayek");
    cy.get("span").should("to.contain", "Melihat Detail Trayek Terpilih");
    cy.get("h1").should("to.contain", "Titik Halte Virtual");

    cy.get("svg.fa-pen-square")
      .last()
      .click();

    cy.url().should("to.contain", "/update");
    cy.get("span").should("to.contain", "Update Halte Virtual Trayek");

    cy.get("#halteVirtualName").clear().type("Pasar Ciputat 2");

    cy.get("button.btn-primary").click();
    cy.get("span").should("to.contain", "Berhasil mengubah halte virtual");
  });

    it("Successfully delete a halte virtual", () => {
      // Login
      cy.visit("/login");
      cy.url().should("to.equal", "http://localhost:8080/login");
      cy.get("#email").type("admin@kiri.id");
      cy.get("#password").type("password");
      cy.get("button").click();
      cy.url().should("to.equal", "http://localhost:8080/");

      cy.visit("/trayekangkot");
      cy.url().should("to.equal", "http://localhost:8080/trayekangkot");
  
      // Access detail trayek page
      cy.get("a[href*='detail']")
        .last()
        .click();
  
      cy.url().should("to.contain", "/detail");
      cy.get("span").should("to.contain", "Detail Trayek");
      cy.get("span").should("to.contain", "Melihat Detail Trayek Terpilih");
      cy.get("h1").should("to.contain", "Titik Halte Virtual");

      cy.get("a[href*='delete']")
        .last()
        .click();
      cy.get("a[href='#'][id*=delete].btn-delete")
        .last()
        .click();
      cy.get("span").should("to.contain", "Berhasil menghapus halte virtual");
    });
});
