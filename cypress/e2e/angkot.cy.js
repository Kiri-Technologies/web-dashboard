describe("Angkot page test", () => {
    it("Successfully access the angkot page", () => {
      // Login
      cy.visit("/login");
      cy.url().should("to.equal", "http://localhost:8080/login");
      cy.get("#email").type("admin@kiri.id");
      cy.get("#password").type("password");
      cy.get("button").click();
      cy.url().should("to.equal", "http://localhost:8080/");

      cy.visit("/angkot");
      cy.url().should("to.equal", "http://localhost:8080/angkot");
      cy.get('div').should("to.contain", "Total Semua Angkot Terdaftar");
      cy.get('div').should("to.contain", "Total Angkot Mendaftar Bulan Ini");
    });

  it("Successfully access the detail angkot page", () => {
    // Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/angkot");
    cy.url().should("to.equal", "http://localhost:8080/angkot");

    cy.get("a[href*='detail']")
      .first()
      .click();

    cy.url().should("to.contain", "/detail");
    cy.get('span').should("to.contain", "Detail Angkot");
    cy.get('span').should("to.contain", "Menampilkan data angkot terpilih");
  });
});
