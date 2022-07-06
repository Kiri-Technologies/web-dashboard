describe("Feedback app test", () => {
  it("Successfully access feedback app page", () => {
    /// Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/feedbackapp");
    cy.url().should("to.equal", "http://localhost:8080/feedbackapp");

    cy.get("span").should("to.contain", "Feedback");
    cy.get("span").should(
      "to.contain",
      "Menampilkan list feedback untuk aplikasi"
    );
  });

  it("Successfully change feedback app status to pending", () => {
    /// Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/feedbackapp");
    cy.url().should("to.equal", "http://localhost:8080/feedbackapp");

    cy.get("a[href*='save']")
      .last()
      .click();
    cy.get("a[href='#'][id*=save].btn-success")
      .last()
      .click();

    cy.get("span").should(
      "to.contain",
      "Berhasil mengubah status menjadi pending"
    );
  });

  it("Successfully change feedback app status to processed", () => {
    /// Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/feedbackapp");
    cy.url().should("to.equal", "http://localhost:8080/feedbackapp");

    cy.get("a.tab.tab-bordered")
      .contains("Pending")
      .click();

    cy.get("a[href*='save']")
      .contains(" Processed ")
      .first()
      .click();
    cy.get("a[href='#'][id*='save'][id*='processed'].btn-success")
      .first()
      .click();

    cy.get("span").should(
      "to.contain",
      "Berhasil mengubah status menjadi processed"
    );
  });

  it("Successfully change feedback app status to cancelled", () => {
    /// Login
    cy.visit("/login");
    cy.url().should("to.equal", "http://localhost:8080/login");
    cy.get("#email").type("admin@kiri.id");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.url().should("to.equal", "http://localhost:8080/");

    cy.visit("/feedbackapp");
    cy.url().should("to.equal", "http://localhost:8080/feedbackapp");

    cy.get("a.tab.tab-bordered")
      .contains("Pending")
      .click();

    cy.get("a[href*='save']")
      .contains(" Cancelled ")
      .first()
      .click();
    cy.get("a[href='#'][id*='save'][id*='cancelled'].btn-success")
      .first()
      .click();

    cy.get("span").should(
      "to.contain",
      "Berhasil mengubah status menjadi cancelled"
    );
  });
});
