"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JEST_STYLE_MOCK = exports.JEST_MEDIA_MOCK = exports.JEST_CONFIG = exports.HL_WEB_TYPES_JSON = exports.HL_ATTRIBUTES_JSON = exports.HL_TAGS_JSON = exports.HL_DIR = exports.HL_MD = exports.HL_TITLE_SLOTS_RE = exports.HL_TITLE_EVENTS_RE = exports.HL_TITLE_ATTRIBUTES_RE = exports.HL_API_RE = exports.HL_COMPONENT_NAME_RE = exports.SITE_EXAMPLE_GLOB = exports.SITE_DOCS_GLOB = exports.SITE_CONFIG = exports.SITE_MOBILE_ROUTES = exports.SITE_PC_ROUTES = exports.SITE_PUBLIC_PATH = exports.SITE_OUTPUT_PATH = exports.SITE = exports.SITE_PC_MAIN = exports.SITE_MOBILE_MAIN = exports.PRIMARY_COLOR = exports.CLI_PACKAGE_JSON = exports.GENERATORS_DIR = exports.TESTS_DIR_NAME = exports.EXAMPLE_DIR_INDEX = exports.DOCS_DIR_NAME = exports.EXAMPLE_LOCALE_DIR_NAME = exports.EXAMPLE_DIR_NAME = exports.STYLE_DIR_NAME = exports.PUBLIC_DIR_INDEXES = exports.SCRIPTS_EXTENSIONS = exports.WEBPACK_RESOLVE_EXTENSIONS = exports.ESLINT_EXTENSIONS = exports.ROOT_DOCS_DIR = exports.TYPES_DIR = exports.UMD_DIR = exports.ES_DIR = exports.SRC_DIR = exports.VARLET_CONFIG = exports.TS_CONFIG = exports.POSTCSS_CONFIG = exports.CWD = void 0;
var path_1 = require("path");
exports.CWD = process.cwd();
exports.POSTCSS_CONFIG = path_1.resolve(exports.CWD, 'postcss.config.js');
exports.TS_CONFIG = path_1.resolve(exports.CWD, 'tsconfig.json');
exports.VARLET_CONFIG = path_1.resolve(exports.CWD, 'varlet.config.js');
exports.SRC_DIR = path_1.resolve(exports.CWD, 'src');
exports.ES_DIR = path_1.resolve(exports.CWD, 'es');
exports.UMD_DIR = path_1.resolve(exports.CWD, 'umd');
exports.TYPES_DIR = path_1.resolve(exports.CWD, 'types');
exports.ROOT_DOCS_DIR = path_1.resolve(exports.CWD, 'docs');
exports.ESLINT_EXTENSIONS = ['.vue', '.ts', '.js', '.mjs', '.tsx', '.jsx'];
exports.WEBPACK_RESOLVE_EXTENSIONS = ['.js', '.jsx', '.vue', '.ts', '.tsx', '.css', '.less'];
exports.SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
exports.PUBLIC_DIR_INDEXES = ['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js'];
exports.STYLE_DIR_NAME = 'style';
exports.EXAMPLE_DIR_NAME = 'example';
exports.EXAMPLE_LOCALE_DIR_NAME = 'locale';
exports.DOCS_DIR_NAME = 'docs';
exports.EXAMPLE_DIR_INDEX = 'index.vue';
exports.TESTS_DIR_NAME = '__tests__';
exports.GENERATORS_DIR = path_1.resolve(__dirname, '../../generators');
exports.CLI_PACKAGE_JSON = path_1.resolve(__dirname, '../../package.json');
exports.PRIMARY_COLOR = '#3a7afe';
// site
exports.SITE_MOBILE_MAIN = path_1.resolve(__dirname, '../../site/mobile/main.ts');
exports.SITE_PC_MAIN = path_1.resolve(__dirname, '../../site/pc/main.ts');
exports.SITE = path_1.resolve(__dirname, '../../site');
exports.SITE_OUTPUT_PATH = path_1.resolve(exports.CWD, 'site');
exports.SITE_PUBLIC_PATH = path_1.resolve(exports.CWD, 'public');
exports.SITE_PC_ROUTES = path_1.resolve(exports.CWD, '.varlet/pc.routes.ts');
exports.SITE_MOBILE_ROUTES = path_1.resolve(exports.CWD, '.varlet/mobile.routes.ts');
exports.SITE_CONFIG = path_1.resolve(exports.CWD, '.varlet/site.config.json');
exports.SITE_DOCS_GLOB = path_1.resolve(exports.CWD, './docs/**');
exports.SITE_EXAMPLE_GLOB = path_1.resolve(exports.CWD, './src/**/example/**');
// template highlight
exports.HL_COMPONENT_NAME_RE = /.*(\/|\\)(.+)(\/|\\)docs(\/|\\)/;
exports.HL_API_RE = /##\s*API\n+/;
exports.HL_TITLE_ATTRIBUTES_RE = /###\s*属性\s*\n+/;
exports.HL_TITLE_EVENTS_RE = /###\s*事件\s*\n+/;
exports.HL_TITLE_SLOTS_RE = /###\s*插槽\s*\n+/;
exports.HL_MD = 'zh-CN.md';
exports.HL_DIR = path_1.resolve(exports.CWD, 'highlight');
exports.HL_TAGS_JSON = path_1.resolve(exports.HL_DIR, 'tags.json');
exports.HL_ATTRIBUTES_JSON = path_1.resolve(exports.HL_DIR, 'attributes.json');
exports.HL_WEB_TYPES_JSON = path_1.resolve(exports.HL_DIR, 'web-types.json');
// jest
exports.JEST_CONFIG = path_1.resolve(__dirname, '../config/jest.config.js');
exports.JEST_MEDIA_MOCK = path_1.resolve(__dirname, '../config/jest.media.mock.js');
exports.JEST_STYLE_MOCK = path_1.resolve(__dirname, '../config/jest.style.mock.js');