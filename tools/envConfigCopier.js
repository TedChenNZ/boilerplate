/* eslint-disable */
const fs = require('fs');
const path = require('path');
const fsE = require('fs-extra');

/***
 * This will determine if code will allow execution if env_config mismatches with the template
 * @type {boolean}
 */

//env_config.local.js file location
const envConfigDIR = "src/config/";
const envConfigProdDIR = "config/";
const envConfigFileName = (env = 'local') => `config.override.${env}.js`;

//env_config.local.js.backup file location
const envConfigBackupDIR = "tools/templates/";
const envConfigBackupFileName = "config.override.template.js";

function envConfigInit() {
  if (fs.existsSync("./" + envConfigDIR + envConfigFileName())) {
    // console.log("config.override.local.js exists, all good...");
  } else {
    // console.log("config.override.local.js does not exist, creating a new one...");
    fsE.copySync(path.resolve("./" + envConfigBackupDIR + envConfigBackupFileName),
      "./" + envConfigDIR + envConfigFileName());
  }
}

exports.envConfigDIR = envConfigDIR;
exports.envConfigProdDIR = envConfigProdDIR;
exports.envConfigFileName = envConfigFileName;
exports.envConfigBackupDIR = envConfigBackupDIR;
exports.envConfigBackupFileName = envConfigBackupFileName;
exports.envConfigInit = envConfigInit;
