// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Remove logs nativos do console
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      });

      // Filtra stderr
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-logging');
          launchOptions.args.push('--disable-gpu');
        }
        return launchOptions;
      });
    },
    hideXHR: true,
    env: {
      brand: "canam",        // marca ativa
      regions: [
        { region: "ca", language: "en" }
      ],
      RUN_DESKTOP: false,
      checkTitle: false,
    },
  },
});