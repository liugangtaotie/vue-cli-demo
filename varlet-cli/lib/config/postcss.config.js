"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostcssOptions = exports.defaultConfig = void 0;
var lodash_1 = require("lodash");
var fs_extra_1 = require("fs-extra");
var constant_1 = require("../shared/constant");
exports.defaultConfig = {
    plugins: [require.resolve('postcss-preset-env')],
};
function getPostcssOptions() {
    var config = {};
    if (fs_extra_1.pathExistsSync(constant_1.POSTCSS_CONFIG)) {
        delete require.cache[require.resolve(constant_1.POSTCSS_CONFIG)];
        config = require(constant_1.POSTCSS_CONFIG);
    }
    return lodash_1.merge(exports.defaultConfig, config);
}
exports.getPostcssOptions = getPostcssOptions;
