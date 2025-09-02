Release Notes
Version 1.0.0
Features:

Cypress test suite for validating main menu navigation for multiple brands and regions.
Dynamic environment configuration using getEnvConfig.
Responsive testing for desktop and random mobile devices.
Automatic handling of newsletter popups and cookie acceptance.
Language-based navigation link fixtures for flexible multi-language support.
Title verification for each navigated page.
Custom commands for brand logo click, popup handling, and cookies.
Improvements:

Error handling for missing configuration.
Skips tests if no links are configured for a language.
Mobile menu navigation support using brand-specific selectors.
How to Run:

npm run cypress:open    # Opens Cypress Test Runner
npm run cypress:run     # Runs tests headlessly


# Release Notes

## Version 1.1.0

**Improvements:**
- Added detailed logging throughout the test script for easier debugging.
- Mobile navigation now always opens the main menu before each navigation, improving reliability.
- Fallback to "More" button if the mobile menu button is not found.
- README updated with latest instructions and features.

**Bug Fixes:**
- Fixed issue where navigation links were not visible on mobile unless the menu was reopened.
- Fixed Cypress command usage outside test context.

**How to Run:**
```sh
npm run cypress:open    # Opens Cypress Test Runner
npm run cypress:run     # Runs tests headlessly
```