const brands = [
  { name: 'Can-Am', fixture: 'pages_canam.json' },
  { name: 'Sea-Doo', fixture: 'pages_seadoo.json' },
  { name: 'Ski-Doo', fixture: 'pages_skidoo.json' }
];

describe('Check jQuery version for all brands', () => {
  const expected = '1.12.4-aem';

  brands.forEach(({ name, fixture }) => {
    describe(`Brand: ${name}`, () => {
      let pagesData;

      before(function () {
        cy.fixture(fixture).then((data) => {
          pagesData = data.pages;
        });
      });

      it(`should have jQuery version ${expected} on all ${name} pages`, function () {
        pagesData.forEach((page) => {
          cy.visit(page);
          cy.checkJQueryVersion(expected);
        });
      });
    });
  });
});