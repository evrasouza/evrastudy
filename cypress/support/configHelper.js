import { canamUI } from './uiConfigs/canam';
import { seadooUI } from './uiConfigs/seadoo';

export function getEnvConfig() {
  const brand = Cypress.env('brand');
  if (!brand) throw new Error('[CONFIG] Missing brand env variable');

  const brandsUI = { canam: canamUI, seadoo: seadooUI };
  const brandCfg = brandsUI[brand];

  if (!brandCfg) {
    throw new Error(`[CONFIG] No UI config found for brand "${brand}"`);
  }

  return {
    brand,
    brandCfg,
    ...brandCfg,                     // <- garante baseUrl, navbarFixture, etc
    regions: Cypress.env('regions') || [],
    RUN_DESKTOP: Cypress.env('RUN_DESKTOP') === true,
    checkTitle: Cypress.env('checkTitle') === true,
  };
}