# Cypress Main Menu Navigation Test Suite

This project contains automated end-to-end tests for validating the main menu navigation of multiple brands and regions using Cypress.

## Features

- Responsive tests for desktop and mobile devices.
- Dynamic configuration for brand, region, and language.
- Automatic handling of popups and cookies.
- Title verification for each navigated page.
- Multi-language support via fixtures.
- Detailed logging for easier debugging.
- Robust mobile menu handling with fallback to "More" button.

## Project Structure

- `cypress/e2e/mainMenu.cy.js` - Main test file for navbar navigation.
- `cypress/support/utils.js` - Utility functions for device selection.
- `cypress/support/configHelper.js` - Loads environment configuration.
- `cypress/fixtures/` - Contains navigation link data for each language and brand.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Configure environment variables or update `configHelper.js` as needed for your brands and regions.

## Running Tests

- Open Cypress Test Runner:
  ```sh
  npm run cypress:open
  ```
- Run tests in headless mode:
  ```sh
  npm run cypress:run
  ```

## Customization

- Update fixtures in `cypress/fixtures/` to add or modify navigation links.
- Adjust selectors and breakpoints in your brand configuration files.

## Support

For issues or questions, please open an issue in this repository.