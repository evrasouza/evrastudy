import { desktopViewport, getRandomDevice } from '../support/utils';
import { getEnvConfig } from '../support/configHelper';

function interpolate(template, region, language) {
  return template.replace('{region}', region).replace('{language}', language);
}

const {
  RUN_DESKTOP,
  regions,
  brand,
  baseUrl,
  landingPath,
  navLinkSelector,
  titleSelector,
  checkTitle,
  navbarFixture,
  mobileMenuButtonXpath,
  mobileBreakpoint,
} = getEnvConfig();

if (!baseUrl || !navbarFixture) {
  throw new Error(`[CONFIG] Brand "${brand}" has no baseUrl or navbarFixture configured`);
}

describe(`Navbar Links - Brand: ${brand}`, () => {
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

      it('Navigates through all navbar links for the language', function () {
        const navbarByLang = this.navbarByLang || {};
        const links = navbarByLang[language];

        if (!links?.length) {
          cy.log(`⚠️ No links configured in the fixture for language "${language}". Skipping...`);
          return;
        }

        links.forEach(({ label, url, title }) => {
          cy.log(`🔗 Testing link: ${label}`);

          cy.get('@currentDevice').then((device) => {
            if (device.width <= mobileBreakpoint && mobileMenuButtonXpath) {
              cy.log(`[MENU] Ensuring mobile menu is open for device: ${device.label}`);
              cy.xpath(mobileMenuButtonXpath).then($btn => {
                if ($btn.length) {
                  cy.log('[MENU] Mobile menu button found, clicking...');
                  cy.wrap($btn).should('be.visible').click();
                }
              });
            }

            if (device.width > mobileBreakpoint) {
              cy.log(`[DESKTOP] Clicking brand logo for device: ${device.label}`);
              cy.clickBrandLogo();
            }
          });

          cy.get(navLinkSelector, { timeout: 20000 })
            .contains(label)
            .should('be.visible')
            .click();

          const expectedPath = interpolate(url, region, language);
          cy.url({ timeout: 30000 }).should('include', expectedPath);

          if (checkTitle && title) {
            cy.get(titleSelector, { timeout: 20000 })
              .first()
              .invoke('text')
              .then((txt) =>
                txt.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
              )
              .should('contain', title.trim());
          }

          //cy.wait(5000); // Wait for potential animations or lazy-loaded content
          // cy.get('@currentDevice').then((device) => {
          //   const name = `${brand}-${region}-${language}-${device.label}-${label}`.replace(/\s+/g, '_');
          //   cy.screenshot(name, { capture: 'viewport' });
          // });
        });
      });
    });
  });
});