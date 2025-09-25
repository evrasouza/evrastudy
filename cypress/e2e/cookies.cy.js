import { desktopViewport, getRandomDevice } from '../support/utils';
import { getEnvConfig } from '../support/configHelper';

const {
  RUN_DESKTOP,
  regions,
  brand,
  baseUrl,
  landingPath,
  navbarFixture,
} = getEnvConfig();

const scenarios = [
  { label: 'acceptCookies', steps: () => cy.acceptCookies() },
  { label: 'chooseCookies', steps: () => cy.chooseCookies() },
  { label: 'prevCookies', steps: () => { cy.chooseCookies(); cy.prevCookies(); } },
  { label: 'acceptAllAndNext', steps: () => { cy.chooseCookies(); cy.acceptAllAndNext(); } },
  { label: 'acceptAllCookies', steps: () => { cy.chooseCookies(); cy.wait(1000); cy.acceptAllCookies(); } },
];

if (!baseUrl || !navbarFixture) {
  throw new Error(`[CONFIG] Brand "${brand}" has no baseUrl or navbarFixture configured`);
}

describe(`Navbar Links - Brand: ${brand}`, { tags: ['smoke']}, () => {
  before(() => {
    cy.handleUncaughtExceptions();
    cy.fixture(navbarFixture).as('navbarByLang');
  });

  regions.forEach(({ region, language }) => {
    describe(`Region: ${region} | Language: ${language}`, () => {
      beforeEach(() => {
        cy.setupTestContext({
          RUN_DESKTOP,
          desktopViewport,
          getRandomDevice,
          baseUrl,
          landingPath,
          region,
          language,
        });
      });

      scenarios.forEach(({ label, steps }, index) => {
        it(`${index + 1}-Validated ${label}`, function () {
          steps();
        });
      });
    });
  });
});