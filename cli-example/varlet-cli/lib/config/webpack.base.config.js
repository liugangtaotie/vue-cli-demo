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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_CONFIG = exports.createBasePlugins = exports.CSS_LOADERS = void 0;
var constant_1 = require("../shared/constant");
var ForkTsCheckerWebpackPlugin_1 = require("fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPlugin");
var vue_loader_1 = require("vue-loader");
var fs_extra_1 = require("fs-extra");
var postcss_config_1 = require("./postcss.config");
var varlet_config_1 = require("./varlet.config");
var lodash_1 = require("lodash");
exports.CSS_LOADERS = [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    {
        loader: require.resolve('postcss-loader'),
        options: { postcssOptions: postcss_config_1.getPostcssOptions() },
    },
];
function createBasePlugins() {
    var plugins = [new vue_loader_1.VueLoaderPlugin()];
    fs_extra_1.pathExistsSync(constant_1.TS_CONFIG) &&
        plugins.push(new ForkTsCheckerWebpackPlugin_1.ForkTsCheckerWebpackPlugin({
            typescript: {
                mode: 'write-references',
                extensions: {
                    vue: {
                        enabled: true,
                        compiler: '@vue/compiler-sfc',
                    },
                },
            },
            logger: {
                issues: 'console',
            },
        }));
    return plugins;
}
exports.createBasePlugins = createBasePlugins;
var VUE_LOADER = {
    loader: require.resolve('vue-loader'),
    options: {
        compilerOptions: {
            preserveWhitespace: false,
        },
    },
};
exports.BASE_CONFIG = {
    target: 'web',
    entry: {
        pc: constant_1.SITE_PC_MAIN,
        mobile: constant_1.SITE_MOBILE_MAIN,
    },
    resolve: {
        extensions: constant_1.WEBPACK_RESOLVE_EXTENSIONS,
        alias: {
            '@config': constant_1.SITE_CONFIG,
            '@pc-routes': constant_1.SITE_PC_ROUTES,
            '@mobile-routes': constant_1.SITE_MOBILE_ROUTES,
        },
    },
    stats: 'errors-warnings',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [VUE_LOADER],
            },
            {
                test: /\.(js|ts|jsx|tsx)$/,
                use: [require.resolve('babel-loader')],
                exclude: /node_modules\/(?!(@varlet\/cli))/,
            },
            {
                test: /\.md$/,
                use: [
                    VUE_LOADER,
                    {
                        loader: require.resolve('@varlet/markdown-loader'),
                        options: {
                            style: lodash_1.get(varlet_config_1.getVarletConfig(), 'highlight.style'),
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.(mp3|wav|ogg|acc)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'audio/[hash][ext][query]',
                },
            },
            {
                test: /\.(mp4|webm)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'video/[hash][ext][query]',
                },
            },
            {
                test: /\.css$/,
                use: exports.CSS_LOADERS,
            },
            {
                test: /\.less$/,
                use: __spreadArray(__spreadArray([], __read(exports.CSS_LOADERS)), [require.resolve('less-loader')]),
            },
        ],
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    plugins: createBasePlugins(),
};
