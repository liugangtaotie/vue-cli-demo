"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getDevConfig = exports.getDevServerConfig = exports.HTML_WEBPACK_PLUGINS = exports.createHtmlPluginOptions = void 0;
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var webpack_base_config_1 = require("./webpack.base.config");
var constant_1 = require("../shared/constant");
var path_1 = require("path");
var lodash_1 = require("lodash");
var varlet_config_1 = require("./varlet.config");
var compileSiteEntry_1 = require("../compiler/compileSiteEntry");
var varletConfig = varlet_config_1.getVarletConfig();
function createHtmlPluginOptions(type) {
    return {
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
        },
        hash: true,
        chunks: [type],
        title: lodash_1.get(varletConfig, type + ".title[" + lodash_1.get(varletConfig, 'defaultLanguage') + "]"),
        logo: lodash_1.get(varletConfig, "logo"),
        baidu: lodash_1.get(varletConfig, "analysis.baidu", ''),
    };
}
exports.createHtmlPluginOptions = createHtmlPluginOptions;
exports.HTML_WEBPACK_PLUGINS = [
    new html_webpack_plugin_1.default(__assign({ template: path_1.resolve(__dirname, '../../site/pc/index.html'), filename: 'index.html' }, createHtmlPluginOptions('pc'))),
    new html_webpack_plugin_1.default(__assign({ template: path_1.resolve(__dirname, '../../site/mobile/mobile.html'), filename: 'mobile.html' }, createHtmlPluginOptions('mobile'))),
];
function getDevServerConfig() {
    var host = lodash_1.get(varletConfig, 'host');
    return {
        port: lodash_1.get(varletConfig, 'port'),
        host: host === 'localhost' ? '0.0.0.0' : host,
        devMiddleware: {
            publicPath: '/',
        },
        static: {
            directory: path_1.resolve(constant_1.CWD, 'public'),
        },
        allowedHosts: 'all',
        hot: true,
    };
}
exports.getDevServerConfig = getDevServerConfig;
function getDevConfig() {
    return webpack_merge_1.default(webpack_base_config_1.BASE_CONFIG, {
        mode: 'development',
        devtool: 'source-map',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    chunks: {
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 0,
                        name: 'chunks',
                    },
                },
            },
        },
        plugins: __spreadArray([
            new webpackbar_1.default({
                name: 'Site development building',
                color: constant_1.PRIMARY_COLOR,
            }),
            new compileSiteEntry_1.VarletSitePlugin()
        ], __read(exports.HTML_WEBPACK_PLUGINS)),
    });
}
exports.getDevConfig = getDevConfig;
