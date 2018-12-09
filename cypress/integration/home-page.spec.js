describe("Home page", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("Shows a header", () => {
    cy.get(".vue-title").should('contain','My Library System');
    cy.get('b > i').should('contain','It\'s a choice to visit our library~~');
  });

  describe("Navigation bar", () => {
    it("Shows the required links", () => {
      cy.get(".navbar").contains('Home' );
      cy.get(':nth-child(1) > :nth-child(1) > .nav-link > .fa').should('contain', 'Home');
      cy.get(':nth-child(1) > :nth-child(2) > .nav-link > .fa').should('contain', 'Manage Books');
      cy.get(':nth-child(1) > :nth-child(3) > .nav-link > .fa').should('contain', 'Add book');
      cy.get(':nth-child(1) > :nth-child(4) > .nav-link > .fa').should('contain', 'Map');
      cy.get('.ml-auto > :nth-child(1) > .nav-link > .fa').should('contain', 'About');
      cy.get('.ml-auto > :nth-child(2) > .nav-link > .fa').should('contain', 'Contact');
    });

    it("Redirects when links are clicked", () => {
      cy.get(':nth-child(1) > :nth-child(3) > .nav-link > .fa').click();
      cy.url().should('include','/addBook' );
      cy.get(':nth-child(1) > :nth-child(2) > .nav-link > .fa').click();
      cy.url().should('include','/books' );
    });
  })
});
