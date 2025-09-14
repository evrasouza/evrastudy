import './commands';
import 'cypress-xpath';
import 'cypress-axe'

Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win, 'dataLayer', {
    value: [],
    writable: true,
  });
  win.gtag = cy.stub().as('gtag');
});

const trackingPatterns = [
  '**/gtag/js**',
];

beforeEach(() => {
  trackingPatterns.forEach((pattern) => {
    cy.intercept({ method: /GET|POST/, url: pattern }, (req) => {
      if (req.url.includes('axeptio')) {
        req.continue();
      } else {
        req.reply({ statusCode: 204, body: '' });
      }
    }).as(`block_${pattern}`);
  });
});

if (Cypress.config('hideXHR')) {
  const originalLog = Cypress.log;
  Cypress.log = function (opts, ...otherArgs) {
    if (opts.displayName === 'xhr' || opts.displayName === 'fetch') {
      return;
    }
    return originalLog(opts, ...otherArgs);
  };
}

Cypress.on('uncaught:exception', (err, runnable) => {
  const ignoreErrors = [
    'Maximum call stack size exceeded',
    'Syntax error, unrecognized expression: #/search',
    'Script error',
    'cross-origin'
  ];

  if (ignoreErrors.some(msg => err.message?.includes(msg))) {
    console.warn(`Ignored error: ${err.message}`);
    return false;
  }
  return true;
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('unrecognized expression')) {
    return false;
  }
});