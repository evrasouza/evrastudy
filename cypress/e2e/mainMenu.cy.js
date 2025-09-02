// cypress/e2e/mainMenu_v1.cy.js
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
  moreMenuButtonXpath // Make sure this is in your config!
} = getEnvConfig();


if (!baseUrl || !navbarFixture) {
  cy.log(`[ERROR] Brand "${brand}" has no baseUrl or navbarFixture configured`);
  throw new Error(`[CONFIG] Brand "${brand}" has no baseUrl or navbarFixture configured`);
}

describe(`Navbar Links - Brand: ${brand}`, () => {
  before(() => {
    cy.log(`[INIT] Loaded config for brand: ${brand}`);
    cy.log('[HOOK] Running before hook');
    cy.handleUncaughtExceptions();
    cy.fixture(navbarFixture).as('navbarByLang');
  });

  regions.forEach(({ region, language }) => {
    describe(`Region: ${region} | Language: ${language}`, () => {
      beforeEach(function () {
        cy.log(`[HOOK] Running beforeEach for region: ${region}, language: ${language}`);
        const device = RUN_DESKTOP ? desktopViewport : getRandomDevice();

        cy.log(`[DEVICE] Viewport: ${device.label} (${device.width}x${device.height})`);
        cy.wrap(device).as('currentDevice');
        cy.viewport(device.width, device.height);

        const startUrl = `${baseUrl}${interpolate(landingPath, region, language)}`;
        cy.log(`[NAV] Visiting start URL: ${startUrl}`);
        cy.visit(startUrl, { failOnStatusCode: false });

        cy.log('[POPUP] Closing newsletter popup');
        cy.closeNewsletterPopup();
        cy.log('[COOKIE] Accepting cookies');
        cy.acceptCookies();
      });

      it('Navigates through all navbar links for the language', function () {
        cy.log('[TEST] Starting navigation test');
        const navbarByLang = this.navbarByLang || {};
        const links = navbarByLang[language];

        if (!links?.length) {
          cy.log(`[SKIP] No links configured in the fixture for language "${language}". Skipping...`);
          return;
        }

        links.forEach(({ label, url, title }, idx) => {
          cy.log(`[LINK ${idx}] Testing link: ${label}`);

          cy.get('@currentDevice').then((device) => {
            if (device.width <= mobileBreakpoint && mobileMenuButtonXpath) {
              cy.log(`[MENU] Ensuring mobile menu is open for device: ${device.label}`);
              cy.xpath(mobileMenuButtonXpath).then($btn => {
                if ($btn.length) {
                  cy.log('[MENU] Mobile menu button found, clicking...');
                  cy.wrap($btn).should('be.visible').click();
                } else if (typeof moreMenuButtonXpath !== 'undefined') {
                  cy.log('[MENU] Mobile menu button not found, trying "More" button...');
                  cy.xpath(moreMenuButtonXpath).then($moreBtn => {
                    if ($moreBtn.length) {
                      cy.log('[MENU] "More" button found, clicking...');
                      cy.wrap($moreBtn).should('be.visible').click();
                      cy.log('[MENU] Trying mobile menu button again after "More"...');
                      cy.xpath(mobileMenuButtonXpath).should('be.visible').click();
                    } else {
                      cy.log('[ERROR] Mobile menu and "More" button not found');
                      throw new Error('Mobile menu and "More" button not found');
                    }
                  });
                } else {
                  cy.log('[ERROR] Mobile menu button not found and no "More" button configured');
                  throw new Error('Mobile menu button not found and no "More" button configured');
                }
              });
            }
          });

          // cy.log('[LOGO] Clicking brand logo');
          // cy.clickBrandLogo();

          cy.log(`[NAV] Looking for nav link: ${label}`);
          cy.get(navLinkSelector, { timeout: 20000 })
            .contains(label)
            .should('be.visible')
            .click();

          const expectedPath = interpolate(url, region, language);
          cy.log(`[ASSERT] Checking URL includes: ${expectedPath}`);
          cy.url({ timeout: 30000 }).should('include', expectedPath);

          if (checkTitle && title) {
            cy.log(`[ASSERT] Checking page title contains: ${title.trim()}`);
            cy.get(titleSelector, { timeout: 20000 })
              .first()
              .invoke('text')
              .then((txt) =>
                txt.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
              )
              .should('contain', title.trim());
          }

          // cy.get('@currentDevice').then((device) => {
          //   const name = `${brand}-${region}-${language}-${device.label}-${label}`.replace(/\s+/g, '_');
          //   cy.screenshot(name, { capture: 'viewport' });
          // });
        });
        cy.log('[TEST] Finished navigation test');
      });
    });
  });
});