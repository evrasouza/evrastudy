// Import custom commands
import './commands';

// Import xpath globally for all tests
import 'cypress-xpath';

// Stub dataLayer and gtag before the window loads
Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win, 'dataLayer', {
    value: [],
    writable: true,
  });
  // Stub Google Analytics gtag function
  win.gtag = cy.stub().as('gtag');
});

// Patterns for requests to intercept (e.g., analytics)
const trackingPatterns = [
  '**/gtag/js**', // Google Analytics gtag
];

// Intercept requests before each test
beforeEach(() => {
  trackingPatterns.forEach((pattern) => {
    cy.intercept({ method: /GET|POST/, url: pattern }, (req) => {
      // Do not block anything related to Axeptio
      if (req.url.includes('axeptio')) {
        req.continue();
      } else {
        // Block the request with an empty response
        req.reply({ statusCode: 204, body: '' });
      }
    }).as(`block_${pattern}`);
  });
});

// Hide XHR and fetch logs in Cypress runner if configured
if (Cypress.config('hideXHR')) {
  const originalLog = Cypress.log;
  Cypress.log = function (opts, ...otherArgs) {
    if (opts.displayName === 'xhr' || opts.displayName === 'fetch') {
      return; // Do not log XHR/fetch requests
    }
    return originalLog(opts, ...otherArgs);
  };
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // Lista de mensagens conhecidas que podem ser ignoradas
  const ignoreErrors = [
    'Maximum call stack size exceeded',
    'Syntax error, unrecognized expression: #/search',
    'Script error',
    'cross-origin'
  ];

  // Se a mensagem do erro corresponder a qualquer uma da lista, bloqueia
  if (ignoreErrors.some(msg => err.message?.includes(msg))) {
    console.warn(`Ignored error: ${err.message}`); // opcional: log para saber que foi ignorado
    return false; // não falha o teste
  }

  // Se não for uma mensagem conhecida, deixa o Cypress falhar
  return true;
});