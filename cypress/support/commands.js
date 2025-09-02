// cypress/support/commands.js
import { getEnvConfig } from './configHelper';

// =======================
// Custom Cypress Commands
// =======================

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

Cypress.Commands.add('acceptCookies', () => {
  cy.get('#axeptio_overlay .needsclick')
    .shadow()
    .find('#axeptio_btn_acceptAll')
    .click();
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