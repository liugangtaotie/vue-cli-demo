"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../shared/constant");
module.exports = {
    moduleNameMapper: {
        '\\.(css|less)$': constant_1.JEST_STYLE_MOCK,
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': constant_1.JEST_MEDIA_MOCK,
    },
    transform: {
        '\\.(vue)$': 'vue-jest',
        '\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx,vue}',
        "!**/" + constant_1.EXAMPLE_DIR_NAME + "/**",
        "!**/" + constant_1.DOCS_DIR_NAME + "/**",
        "!**/" + constant_1.TESTS_DIR_NAME + "/**",
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    transformIgnorePatterns: ['/node_modules/(?!(@varlet/cli))'],
};
