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


Cypress.Commands.add('openMainMenu', (device, mobileBreakpoint, mobileMenuButtonXpath) => {
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

// teste de jquery
Cypress.Commands.add('checkJQueryVersion', (expectedVersion) => {
  cy.window().then((win) => {
    const version = win.jQuery().jquery;
    const passed = version === expectedVersion;

    // Popup visual
    const popup = win.document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '20%';
    popup.style.right = '20px';
    popup.style.transform = 'none';
    popup.style.backgroundColor = passed ? '#4CAF50' : '#f44336';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.fontSize = '20px';
    popup.style.fontWeight = 'bold';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    popup.style.zIndex = 9999;
    popup.style.textAlign = 'center';
    popup.style.minWidth = '300px';
    popup.style.maxWidth = '600px';

    popup.textContent = passed
      ? `✅ jQuery version check passed! Version found: ${version}`
      : `❌ jQuery version check failed! Expected: ${expectedVersion}, Found: ${version}`;

    win.document.body.appendChild(popup);

    cy.wait(2000);

    cy.document().then((doc) => {
      const infoBanner = doc.createElement('div');
      infoBanner.id = 'cypress-info-banner';
      infoBanner.style.position = 'fixed';
      infoBanner.style.bottom = '0';
      infoBanner.style.left = '0';
      infoBanner.style.width = '100%';
      infoBanner.style.backgroundColor = 'rgba(0,0,0,0.7)';
      infoBanner.style.color = 'white';
      infoBanner.style.fontSize = '12px';
      infoBanner.style.padding = '5px';
      infoBanner.style.zIndex = '9999';
      infoBanner.style.fontFamily = 'Arial, sans-serif';
      infoBanner.style.textAlign = 'right';

      const date = new Date();
      const formattedDate = date.toLocaleString();
      infoBanner.innerText = `URL: ${doc.location.href} | Date: ${formattedDate}`;

      doc.body.appendChild(infoBanner);
    });

    cy.screenshot(passed ? 'jquery_passed_viewport' : 'jquery_failed_viewport', { capture: 'viewport' });
    expect(version).to.eq(expectedVersion);
  });
});