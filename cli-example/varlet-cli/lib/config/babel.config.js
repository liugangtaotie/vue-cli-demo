"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (api, options) {
    if (options === void 0) { options = {}; }
    if (api) {
        api.cache.never();
    }
    var isTest = process.env.NODE_ENV === 'test';
    return {
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    modules: isTest ? 'commonjs' : false,
                    loose: options.loose,
                },
            ],
            require.resolve('@babel/preset-typescript'),
            require('./babel.sfc.transform'),
        ],
        plugins: [
            [
                require.resolve('babel-plugin-import'),
                {
                    libraryName: '@varlet/ui',
                    libraryDirectory: 'es',
                    style: true,
                },
                '@varlet/ui',
            ],
            [
                require.resolve('@vue/babel-plugin-jsx'),
                {
                    enableObjectSlots: options.enableObjectSlots,
                },
            ],
        ],
    };
};
exports.default = module.exports;
