describe('Check jQuery version', () => {
  before(function () {
    cy.fixture('pages.json').as('pagesData');
  });

  it('should have jQuery version 1.12.4-aem on all pages', function () {
    const expected = '1.12.4-aem';
    this.pagesData.pages.forEach((page) => {
      cy.visit(page);
      cy.checkJQueryVersion(expected);
    });
  });
});