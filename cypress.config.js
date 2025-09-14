const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      });
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
      brand: "canam",
      regions: [
        { region: "ca", language: "en" }, // region: 🇨🇦 language: 🇬🇧
        // { region: "ca", language: "fr" }, // region: 🇨🇦 language: 🇫🇷
        // { region: "us", language: "en" }, // region: 🇺🇸 language: 🇬🇧
        // { region: "us", language: "es" }, // region: 🇺🇸 language: 🇪🇸
        // { region: "mx", language: "es" }, // region: 🇲🇽 language: 🇪🇸
        // { region: "be", language: "fr" }, // region: 🇧🇪 language: 🇫🇷
        // { region: "be", language: "nl" }, // region: 🇧🇪 language: 🇳🇱
        // { region: "de", language: "de" }, // region: 🇩🇪 language: 🇩🇪
        // { region: "es", language: "es" }, // region: 🇪🇸 language: 🇪🇸
        // { region: "fi", language: "fi" }, // region: 🇫🇮 language: 🇫🇮
        // { region: "fr", language: "fr" }, // region: 🇫🇷 language: 🇫🇷
        // { region: "it", language: "it" }, // region: 🇮🇹 language: 🇮🇹
        // { region: "no", language: "no" }, // region: 🇳🇴 language: 🇳🇴
        // { region: "se", language: "sv" }, // region: 🇸🇪 language: 🇸🇪
        // { region: "gb", language: "en" }  // region: 🇬🇧 language: 🇬🇧
      ],
      RUN_DESKTOP: false,
      checkTitle: false,
    },
  },
});