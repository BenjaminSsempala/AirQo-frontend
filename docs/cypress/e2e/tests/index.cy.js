/// <reference types="cypress" />

describe("Verify AirQo Documentation Home Page", () => {
  //block of tests
  it("Verify AirQo Documentation Home Page Loads successfully", () => {
    cy.visit("http://localhost:3000/#/");
  });

  it("Verify AirQo logo is present and visible", () => {
    cy.get("section > .cover-main").eq(0).should("be.visible");
  });

  it("Verify Header is present", () => {
    cy.get("blockquote")
      .first()
      .should("be.exist")
      .contains("Clean Air for all African Cities");
  });

  it("Verify GitHub Call-To-Action is functional", () => {
    cy.get('[href="https://github.com/airqo-platform"]').click();
  });

  it("Verify Explore Data Call-To-Action is functional", () => {
    cy.get('[href="https://airqo.net/explore-data"]').click();
  });

  it("Verify Side Bar menu sections exist", () => {
    cy.get(".sidebar > .search").should("be.exist");
    cy.get(".sidebar > .app-name").should("be.exist");
    cy.get(".sidebar > .sidebar-nav").should("be.exist");
  });

  it("Verify Side Bar Navigation menu Links are present", () => {
    cy.get("a[title='API']").first().should("be.exist");
    cy.get("a[title='Calibration']").first().should("be.exist");
    cy.get("a[title='Hardware']").first().should("be.exist");
    cy.get("a[title='Mobile App']").first().should("be.exist");
    cy.get("a[title='Platform']").first().should("be.exist");
  });
});
