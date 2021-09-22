"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.VarletSitePlugin = exports.buildSiteEntry = exports.buildPcSiteRoutes = exports.buildMobileSiteRoutes = exports.findRootDocsPaths = exports.findComponentDocsPaths = exports.findExamplePaths = exports.getRootDocsRoutePath = exports.getComponentDocsRoutePath = exports.getExampleRoutePath = void 0;
var slash_1 = __importDefault(require("slash"));
var chokidar_1 = __importDefault(require("chokidar"));
var constant_1 = require("../shared/constant");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var fsUtils_1 = require("../shared/fsUtils");
var varlet_config_1 = require("../config/varlet.config");
var EXAMPLE_COMPONENT_NAME_RE = /\/([-\w]+)\/example\/index.vue/;
var COMPONENT_DOCS_RE = /\/([-\w]+)\/docs\/([-\w]+)\.md/;
var ROOT_DOCS_RE = /\/docs\/([-\w]+)\.([-\w]+)\.md/;
function getExampleRoutePath(examplePath) {
    var _a;
    return '/' + ((_a = examplePath.match(EXAMPLE_COMPONENT_NAME_RE)) === null || _a === void 0 ? void 0 : _a[1]);
}
exports.getExampleRoutePath = getExampleRoutePath;
function getComponentDocsRoutePath(componentDocsPath) {
    var _a;
    var _b = __read((_a = componentDocsPath.match(COMPONENT_DOCS_RE)) !== null && _a !== void 0 ? _a : [], 3), routePath = _b[1], language = _b[2];
    return "/" + language + "/" + routePath;
}
exports.getComponentDocsRoutePath = getComponentDocsRoutePath;
function getRootDocsRoutePath(rootDocsPath) {
    var _a;
    var _b = __read((_a = rootDocsPath.match(ROOT_DOCS_RE)) !== null && _a !== void 0 ? _a : [], 3), routePath = _b[1], language = _b[2];
    return "/" + language + "/" + routePath;
}
exports.getRootDocsRoutePath = getRootDocsRoutePath;
function findExamplePaths() {
    return __awaiter(this, void 0, void 0, function () {
        var dir, buildPath, existPath, slashPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.readdir(constant_1.SRC_DIR)];
                case 1:
                    dir = _a.sent();
                    buildPath = function (filename) { return path_1.resolve(constant_1.SRC_DIR, filename, constant_1.EXAMPLE_DIR_NAME, constant_1.EXAMPLE_DIR_INDEX); };
                    existPath = function (filename) { return fs_extra_1.pathExistsSync(buildPath(filename)); };
                    slashPath = function (filename) { return slash_1.default(buildPath(filename)); };
                    return [2 /*return*/, dir.filter(existPath).map(slashPath)];
            }
        });
    });
}
exports.findExamplePaths = findExamplePaths;
function findComponentDocsPaths() {
    return __awaiter(this, void 0, void 0, function () {
        var dir, buildPath, existPath, collectRoutePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.readdir(constant_1.SRC_DIR)];
                case 1:
                    dir = _a.sent();
                    buildPath = function (filename) { return path_1.resolve(constant_1.SRC_DIR, filename, constant_1.DOCS_DIR_NAME); };
                    existPath = function (filename) { return fs_extra_1.pathExistsSync(buildPath(filename)); };
                    collectRoutePath = function (routePaths, filename) {
                        var dirPath = buildPath(filename);
                        fs_extra_1.readdirSync(dirPath).forEach(function (mdName) {
                            var path = path_1.resolve(dirPath, mdName);
                            fsUtils_1.isMD(path) && routePaths.push(slash_1.default(path));
                        });
                        return routePaths;
                    };
                    return [2 /*return*/, dir.filter(existPath).reduce(collectRoutePath, [])];
            }
        });
    });
}
exports.findComponentDocsPaths = findComponentDocsPaths;
function findRootDocsPaths() {
    return __awaiter(this, void 0, void 0, function () {
        var dir, buildPath, existPath, slashPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs_extra_1.pathExistsSync(constant_1.ROOT_DOCS_DIR)) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, fs_extra_1.readdir(constant_1.ROOT_DOCS_DIR)];
                case 1:
                    dir = _a.sent();
                    buildPath = function (filename) { return path_1.resolve(constant_1.ROOT_DOCS_DIR, filename); };
                    existPath = function (filename) { return fsUtils_1.isMD(buildPath(filename)); };
                    slashPath = function (filename) { return slash_1.default(buildPath(filename)); };
                    return [2 /*return*/, dir.filter(existPath).map(slashPath)];
            }
        });
    });
}
exports.findRootDocsPaths = findRootDocsPaths;
function buildMobileSiteRoutes() {
    return __awaiter(this, void 0, void 0, function () {
        var examplePaths, routes, source;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findExamplePaths()];
                case 1:
                    examplePaths = _a.sent();
                    routes = examplePaths.map(function (examplePath) { return "\n  {\n    path: '" + getExampleRoutePath(examplePath) + "',\n    component: () => import('" + examplePath + "')\n  }"; });
                    source = "export default [  " + routes.join(',') + "\n]";
                    return [4 /*yield*/, fsUtils_1.outputFileSyncOnChange(constant_1.SITE_MOBILE_ROUTES, source)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildMobileSiteRoutes = buildMobileSiteRoutes;
function buildPcSiteRoutes() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, componentDocsPaths, rootDocsPaths, componentDocsRoutes, rootDocsRoutes, source;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([findComponentDocsPaths(), findRootDocsPaths()])];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 2]), componentDocsPaths = _a[0], rootDocsPaths = _a[1];
                    componentDocsRoutes = componentDocsPaths.map(function (componentDocsPath) { return "\n  {\n    path: '" + getComponentDocsRoutePath(componentDocsPath) + "',\n    // @ts-ignore\n    component: () => import('" + componentDocsPath + "')\n  }"; });
                    rootDocsRoutes = rootDocsPaths.map(function (rootDocsPath) { return "\n  {\n    path: '" + getRootDocsRoutePath(rootDocsPath) + "',\n    // @ts-ignore\n    component: () => import('" + rootDocsPath + "')\n  }"; });
                    source = "export default [  " + __spreadArray(__spreadArray([], __read(componentDocsRoutes)), [rootDocsRoutes]).join(',') + "\n]";
                    fsUtils_1.outputFileSyncOnChange(constant_1.SITE_PC_ROUTES, source);
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildPcSiteRoutes = buildPcSiteRoutes;
function buildSiteEntry() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    varlet_config_1.getVarletConfig();
                    return [4 /*yield*/, Promise.all([buildMobileSiteRoutes(), buildPcSiteRoutes()])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildSiteEntry = buildSiteEntry;
var PLUGIN_NAME = 'VarletSitePlugin';
var VarletSitePlugin = /** @class */ (function () {
    function VarletSitePlugin() {
    }
    VarletSitePlugin.prototype.apply = function (compiler) {
        if (process.env.NODE_ENV === 'production') {
            compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, buildSiteEntry);
        }
        else {
            var watcher = chokidar_1.default.watch([constant_1.SITE_EXAMPLE_GLOB, constant_1.SITE_DOCS_GLOB, constant_1.VARLET_CONFIG]);
            watcher.on('add', buildSiteEntry).on('unlink', buildSiteEntry).on('change', buildSiteEntry);
            compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, buildSiteEntry);
        }
    };
    return VarletSitePlugin;
}());
exports.VarletSitePlugin = VarletSitePlugin;
