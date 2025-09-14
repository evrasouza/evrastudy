export const canamUI = {
  baseUrl: "https://can-am.brp.com",
  //iframeSelector: "iframe#lightbox-iframe-0411f80a-3624-436b-912b-646a2ad68cd6",
  //lightbox-inline-form-                   0411f80a-3624-436b-912b-646a2ad68cd6
  iframeSelector: "iframe#lightbox-iframe-a99a5fa1-965c-4741-a68f-f6bc495c28dd",
  //lightbox-inline-form-                 a99a5fa1-965c-4741-a68f-f6bc495c28dd
  navbarFixture: "navbarLinks.canam.json",
  landingPath: "/off-road/{region}/{language}",
  navLinkSelector: "#navbarSupportedContent a.nav-link",
  mobileMenuButtonXpath: '//*[@id="aem-site-wrapper"]/div[1]/div/header/nav/div[1]/div/button',
  titleSelector: "h1, .cmp-title__text, .page-title",
  mobileBreakpoint: 1024,
};

export const selectVehicleToGetAQuote = {
  menuType: "sxs",
  modelName: "defender",
  shoppingTool: 'Get a quote',
  titlePage: "REQUEST A QUOTE"
};