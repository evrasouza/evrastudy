const brands = [
  { name: 'Can-Am', fixture: 'pages_canam.json' },
  // { name: 'Sea-Doo', fixture: 'pages_seadoo.json' },
  // { name: 'Ski-Doo', fixture: 'pages_skidoo.json' }
];

const expected = '1.12.4-aem';

brands.forEach(({ name, fixture }) => {
  // Carrega o fixture sincronicamente
  const pagesData = require(`../fixtures/${fixture}`).pages;

  describe(`Brand: ${name}`, () => {
    it('should load pages data', function () {
      expect(pagesData).to.exist;
    });

    pagesData.forEach((page) => {
      it(`should have jQuery version ${expected} on page: ${page}`, function () {
        cy.visit(page);
        cy.checkJQueryVersion(expected);
      });
    });
  });
});