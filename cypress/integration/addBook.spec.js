describe("AddBook page", () => {

  beforeEach(() => {
    cy.visit("/");
    // Click Donate navbar link
    cy.get('.navbar-nav:nth-child(1)').
    find('.nav-item:nth-child(3)').click()
  });

  it("allows a valid book to be submitted", () => {
    // Fill out web form
    cy.get('label').contains('Book Name').next().type('HappyBook');
    cy.get('label').contains('Book Author').next().type('HappyPerson');
    cy.get('label').contains('Book Press').next().type('HappyPress');
    cy.contains('Successfully added!').should('not.exist');
    cy.get('.error').should('not.exist')
    cy.get('button[type=submit]').click();
    cy.contains('Successfully added!').should('exist');
  });

  it("shows error messages for incomplete form fields", () => {
    cy.get('button[type=submit]').click();
    cy.get('.error').contains('Book name is Required')
    cy.get('.error').contains('Author is Required')
    cy.get('.error').contains('Press is Required')
  });
})
