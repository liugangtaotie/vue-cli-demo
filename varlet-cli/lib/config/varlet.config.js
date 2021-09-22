"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVarletConfig = void 0;
var fs_extra_1 = require("fs-extra");
var lodash_1 = require("lodash");
var constant_1 = require("../shared/constant");
var fsUtils_1 = require("../shared/fsUtils");
function getVarletConfig() {
    var config = {};
    if (fs_extra_1.pathExistsSync(constant_1.VARLET_CONFIG)) {
        delete require.cache[require.resolve(constant_1.VARLET_CONFIG)];
        config = require(constant_1.VARLET_CONFIG);
    }
    delete require.cache[require.resolve('../../varlet.default.config.js')];
    var defaultConfig = require('../../varlet.default.config.js');
    var mergedConfig = lodash_1.merge(defaultConfig, config);
    var source = JSON.stringify(mergedConfig, null, 2);
    fsUtils_1.outputFileSyncOnChange(constant_1.SITE_CONFIG, source);
    return mergedConfig;
}
exports.getVarletConfig = getVarletConfig;
