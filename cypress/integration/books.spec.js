describe("Manage Books page", () => {

  beforeEach(() => {
    cy.request('https://node-js-library.herokuapp.com/books/')
      .its('body')
      .then( (books) => {
        books.forEach((element) => {
          cy.request('DELETE',
            'https://node-js-library.herokuapp.com/books/' + element._id);
        });
      });
    cy.request('https://node-js-library.herokuapp.com/books/')
      .its('body')
      .then( (books) => {
        cy.request('POST', 'https://node-js-library.herokuapp.com/books/', {"book_name": "Happy book", "author": "HelloHello", "publishing": "Good Language Press"} );
        cy.request('POST', 'https://node-js-library.herokuapp.com/books/', {"book_name": "Happy book", "author": "HelloHello", "publishing": "Good Language Press"});
        cy.request('POST', 'https://node-js-library.herokuapp.com/books/', {"book_name": "Happy book", "author": "HelloHello", "publishing": "Good Language Press"} );
      });
    // Visit Manage Books page
    cy.visit("/");
    cy.get(':nth-child(1) > :nth-child(2) > .nav-link > .fa').click();
  });

  it("allows a book to be deleted", () => {
    cy.get('tbody').find('tr').should('have.length', 3)
    cy.get(':nth-child(2) > :nth-child(9) > .fa').click()
    cy.get('button').contains('Delete').click()
    cy.get('tbody').find('tr').should('have.length', 2)
    cy.get('button').contains('OK').click()
  });

  it("allows a book to be upvoted", () => {
    cy.get(':nth-child(1) > :nth-child(7) > .fa').click()
    cy.get('.VueTables__upvotes-filter-wrapper > .form-control').type(1)
    cy.get('tbody').find('tr').should('have.length', 1)
  });
})
