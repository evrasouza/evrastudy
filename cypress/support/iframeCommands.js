Cypress.Commands.add('getIframeBodyWhenReady', (iframeSelector) => {
  return cy
    .get(iframeSelector, { timeout: 20000 })
    .then($iframe => {
      const iframeEl = $iframe[0];
      return new Cypress.Promise(resolve => {
        const check = () => {
          const doc = iframeEl.contentDocument;
          if (
            doc &&
            doc.readyState === 'complete' &&
            doc.body &&
            doc.body.childElementCount > 0
          ) {
            resolve(doc.body);
          } else {
            setTimeout(check, 200);
          }
        };
        check();
      });
    })
    .then(iframeBody => cy.wrap(iframeBody));
});

Cypress.Commands.add('fillIframeFieldInput', (iframeSelector, fieldId, value) => {
  cy.getIframeBodyWhenReady(iframeSelector)
    .find(`input#${fieldId}`)
    .should('be.visible')
    .type(value);
});

Cypress.Commands.add('fillIframeFieldSelect', (iframeSelector, selectId, value) => {
  cy.getIframeBodyWhenReady(iframeSelector)
    .find(`select#${selectId}`)
    .should('be.visible')
    .select(value)
    .should('have.value', value);
});

Cypress.Commands.add('validateIframeFieldSelect', (iframeSelector, selectId, expectedValue) => {
  cy.getIframeBodyWhenReady(iframeSelector)
    .find(`select#${selectId}`)
    .should('be.visible')
    .should('have.value', expectedValue)
    .should('be.disabled');
});

Cypress.Commands.add('clickIframeCheckboxes', (iframeSelector, checkboxIds) => {
  cy.getIframeBodyWhenReady(iframeSelector).then(iframeBody => {
    checkboxIds.forEach((checkboxId) => {
      cy.wrap(iframeBody)
        .find(`input[type="checkbox"]#${checkboxId}`)
        .should('be.visible')
        .click();
    });
  });
});

Cypress.Commands.add('fillIframeForm', (iframeSelector, data) => {
  cy.fillIframeFieldInput(iframeSelector, 'form_input_first_name', data.firstName);
  cy.fillIframeFieldInput(iframeSelector, 'form_input_last_name', data.lastName);
  cy.fillIframeFieldInput(iframeSelector, 'form_input_email', data.email);
  cy.fillIframeFieldSelect(iframeSelector, 'form_input_country_code', data.countryCode);
  cy.fillIframeFieldInput(iframeSelector, 'form_input_phone', data.phone);
  cy.validateIframeFieldSelect(iframeSelector, 'form_input_custom1', data.custom1);
  cy.fillIframeFieldInput(iframeSelector, 'form_input_custom2', data.custom2);
  cy.fillIframeFieldInput(iframeSelector, 'form_input_custom3', data.custom3);
  cy.fillIframeFieldSelect(iframeSelector, 'form_input_custom4', data.custom4);
  cy.fillIframeFieldInput(iframeSelector, 'form_input_custom5', data.custom5);
  cy.clickIframeCheckboxes(iframeSelector, data.checkboxes);
});