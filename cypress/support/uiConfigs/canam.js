// cypress/support/uiConfigs/canam.js
export const canamUI = {
  baseUrl: "https://can-am.brp.com",
  navbarFixture: "navbarLinks.canam.json",
  landingPath: "/off-road/{region}/{language}",
  navLinkSelector: "#navbarSupportedContent a.nav-link",
  mobileMenuButtonXpath: '//*[@id="aem-site-wrapper"]/div[1]/div/header/nav/div[1]/div/button',
  titleSelector: "h1, .cmp-title__text, .page-title",
  mobileBreakpoint: 1024,
};