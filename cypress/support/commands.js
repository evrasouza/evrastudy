import { getEnvConfig } from './configHelper';
import './iframeCommands';

Cypress.Commands.add('handleUncaughtExceptions', () => {
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Script error') || err.message.includes('cross-origin')) {
      return false;
    }
    return true;
  });
});

Cypress.Commands.add('closeNewsletterPopup', () => {
  cy.xpath('//div[contains(@id, "newsletter-popup")]//button', { timeout: 30000 })
    .should('be.visible')
    .click({ force: true });
});

// I accept all
Cypress.Commands.add('acceptCookies', () => {
  cy.get('#axeptio_overlay .needsclick')
    .shadow()
    .find('#axeptio_btn_acceptAll')
    .click({ force: true });
});

// I choose 
Cypress.Commands.add('chooseCookies', () => {
  cy.get('#axeptio_overlay .needsclick')
    .shadow()
    .find('#axeptio_btn_configure')
    .click({ force: true });
});

// If axeptio_btn_configure was clicked
// Go back to the previous cookie settings page
Cypress.Commands.add('prevCookies', () => {
  cy.get('#axeptio_overlay .needsclick')
    .shadow()
    .find('#axeptio_btn_prev')
    .click({ force: true });
});

// I accept the cookies of this step and want to go to the next step
Cypress.Commands.add('acceptAllAndNext', () => {
  cy.get('#axeptio_overlay .needsclick')
    .shadow()
    .find('#axeptio_btn_acceptAllAndNext')
    .click({ force: true });
});

// Done
Cypress.Commands.add('acceptAllCookies', () => {
  cy.get('#axeptio_overlay .needsclick')
    .shadow()
    .find('#axeptio_btn_next')
    .click({ force: true });
});

Cypress.Commands.add('normalizeText', { prevSubject: true }, (subject) => {
  return subject
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
});

Cypress.Commands.add('openMobileMenuIfNeeded', (deviceWidth) => {
  const { mobileBreakpoint, mobileMenuButtonXpath } = getEnvConfig();
  if (deviceWidth <= mobileBreakpoint && mobileMenuButtonXpath) {
    cy.xpath(mobileMenuButtonXpath)
      .should('be.visible')
      .click();
  }
});

Cypress.Commands.add('clickBrandLogo', () => {
  cy.get('a.navbar-brand', { timeout: 30000 })
    .should('be.visible')
    .click();
});

Cypress.Commands.add('openMobileMenuIfNeeded', (device, mobileMenuButtonXpath) => {
  if (device.width <= Cypress.env('mobileBreakpoint') && mobileMenuButtonXpath) {
    cy.log(`[MENU] Ensuring mobile menu is open for device: ${device.label}`);
    cy.xpath(mobileMenuButtonXpath).then($btn => {
      if ($btn.length) {
        cy.log('[MENU] Mobile menu button found, clicking...');
        cy.wrap($btn).should('be.visible').click();
      }
    });
  }
});

Cypress.Commands.add('clickBrandLogoIfDesktop', (device) => {
  if (device.width > Cypress.env('mobileBreakpoint')) {
    cy.log(`[DESKTOP] Clicking brand logo for device: ${device.label}`);
    cy.clickBrandLogo();
  }
});

Cypress.Commands.add('logAndScreenshot', (label) => {
  cy.log(`🔗 ${label}`);
  cy.get('@currentDevice').then((device) => {
    const { brand, region, language } = Cypress.env(); // pega do env
    const name = `${brand}-${region}-${language}-${device.label}-${label}`.replace(/\s+/g, '_');
    cy.screenshot(name, { capture: 'viewport' });
  });
});

Cypress.Commands.add('setupTestContext', (options) => {
  const { RUN_DESKTOP, desktopViewport, getRandomDevice, baseUrl, landingPath, region, language } = options;

  const device = RUN_DESKTOP ? desktopViewport : getRandomDevice();
  cy.log(`🖥️ Viewport: ${device.label} (${device.width}x${device.height})`);
  cy.wrap(device).as('currentDevice');
  cy.viewport(device.width, device.height);

  const startUrl = `${baseUrl}${landingPath.replace('{region}', region).replace('{language}', language)}`;
  cy.visit(startUrl, { failOnStatusCode: false });
});

Cypress.Commands.add('clickMenuType', (menuType) => {
  cy.get(`a.nav-link[data-analytic-label="${menuType}"]`)
    .should('be.visible')
    .eq(1)
    .click();
});

Cypress.Commands.add('clickModelByName', (modelName) => {
  cy.get(`a[data-technical-name="${modelName}"]`)
    .should('be.visible')
    .click();
});

Cypress.Commands.add('selectOptionShoppingTool', (selShopTool) => {
  cy.get(`ul.cmp-shopping-tools a[aria-label="${selShopTool}"]`).parent('li')
    .should('be.visible')
    .click();
});

Cypress.Commands.add('validatePageTitle', (expectedTitle) => {
  cy.get('h1.cmp-teaser__title')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const cleanText = text.trim();
      expect(cleanText).to.eq(expectedTitle);
    });
});
