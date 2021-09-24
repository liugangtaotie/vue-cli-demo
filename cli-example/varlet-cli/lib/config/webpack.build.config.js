"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildConfig = void 0;
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var webpack_base_config_1 = require("./webpack.base.config");
var constant_1 = require("../shared/constant");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var webpack_dev_config_1 = require("./webpack.dev.config");
var compileSiteEntry_1 = require("../compiler/compileSiteEntry");
function getBuildConfig() {
    return webpack_merge_1.default(webpack_base_config_1.BASE_CONFIG, {
        mode: 'production',
        output: {
            publicPath: './',
            path: constant_1.SITE_OUTPUT_PATH,
            filename: 'js/[name].[contenthash:8].js',
            chunkFilename: 'js/[name].[contenthash:8].js',
        },
        plugins: __spreadArray([
            new webpackbar_1.default({
                name: 'Site production building',
                color: constant_1.PRIMARY_COLOR,
            }),
            new clean_webpack_plugin_1.CleanWebpackPlugin(),
            new copy_webpack_plugin_1.default({
                patterns: [{ from: constant_1.SITE_PUBLIC_PATH, to: constant_1.SITE_OUTPUT_PATH }],
            }),
            new compileSiteEntry_1.VarletSitePlugin()
        ], __read(webpack_dev_config_1.HTML_WEBPACK_PLUGINS)),
    });
}
exports.getBuildConfig = getBuildConfig;
