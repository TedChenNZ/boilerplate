/**
 * Base Configs for the Project (these can be overwritten locally by './config.override.local.js')
 * Read /Readme.md for more info
 */
const APP_CONFIG = {
  API_URL_BASE: "http://localhost:3004/",
};


/***
 * Merges BaseConfigs with local config.override.local.js
 */
const ConfigManager = APP_CONFIG;
if (window.APP_CONFIG_OVERRIDE) {
  Object.keys(window.APP_CONFIG_OVERRIDE).forEach(appConfigKey => {
    if (window.APP_CONFIG_OVERRIDE[appConfigKey] != null || window.APP_CONFIG_OVERRIDE[appConfigKey] === "") {
      ConfigManager[appConfigKey] = window.APP_CONFIG_OVERRIDE[appConfigKey];
    }
  })
}
export default ConfigManager;
