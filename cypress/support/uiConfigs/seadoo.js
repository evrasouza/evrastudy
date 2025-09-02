// cypress/support/uiConfigs/seadoo.js
export const seadooUI = {
    baseUrl: "https://sea-doo.brp.com",
  navbarFixture: "navbarLinks.seadoo.json",
  landingPath: "/{region}/{language}",
  navLinkSelector: "#navbarSupportedContent a.nav-link",
  mobileMenuButtonXpath: '//*[@id="aem-site-wrapper"]/div[1]/div/header/nav/div[1]/div/button',
  titleSelector: "h1, .cmp-title__text, .page-title",
  mobileBreakpoint: 1024,
};