import { desktopViewport, getRandomDevice } from '../support/utils';
import { getEnvConfig } from '../support/configHelper';
import { canamUI, selectVehicleToGetAQuote } from '../support/uiConfigs/canam';
import { canamFormData } from '../support/uiConfigs/formData';

const {
  RUN_DESKTOP,
  regions,
  brand,
  baseUrl,
  landingPath,
  navbarFixture,
} = getEnvConfig();

const iframeSelector = canamUI.iframeSelector;

if (!baseUrl || !navbarFixture) {
  throw new Error(`[CONFIG] Brand "${brand}" has no baseUrl or navbarFixture configured`);
}

describe(`Navigation flow to form submission - Brand: ${brand}`, () => {
  before(() => {
    cy.handleUncaughtExceptions();
    cy.fixture(navbarFixture).as('navbarByLang');
  });

  regions.forEach(({ region, language }) => {
    describe(`Region: ${region} | Language: ${language}`, () => {
      beforeEach(function () {
        cy.setupTestContext({
          RUN_DESKTOP,
          desktopViewport,
          getRandomDevice,
          baseUrl,
          landingPath,
          region,
          language,
        });
        cy.closeNewsletterPopup();
        cy.acceptCookies();
      });

      it('Should navigate to the form, fill it out, and validate the submission', function () {
        const navbarByLang = this.navbarByLang || {};
        const links = navbarByLang[language];
        cy.log(`🔗 Testing: `);
        cy.clickMenuType(selectVehicleToGetAQuote.menuType)
        cy.clickModelByName(selectVehicleToGetAQuote.modelName);
        cy.selectOptionShoppingTool(selectVehicleToGetAQuote.shoppingTool);
        cy.validatePageTitle(selectVehicleToGetAQuote.titlePage);
        cy.fillIframeForm(iframeSelector, canamFormData);
      });
    });
  });
});