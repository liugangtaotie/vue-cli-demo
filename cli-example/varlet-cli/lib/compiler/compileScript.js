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
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileLibraryEntry = exports.compileScriptFile = exports.compileScript = exports.replaceTSXExt = exports.replaceJSXExt = exports.replaceTSExt = exports.replaceVueExt = exports.IMPORT_TSX_PATH_RE = exports.IMPORT_JSX_PATH_RE = exports.IMPORT_TS_PATH_RE = exports.IMPORT_VUE_PATH_RE = void 0;
var core_1 = require("@babel/core");
var fsUtils_1 = require("../shared/fsUtils");
var fs_extra_1 = require("fs-extra");
var compileStyle_1 = require("./compileStyle");
var path_1 = require("path");
exports.IMPORT_VUE_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.vue(\s*['"`]);?(?!\s*['"`])/g;
exports.IMPORT_TS_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.ts(\s*['"`]);?(?!\s*['"`])/g;
exports.IMPORT_JSX_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.jsx(\s*['"`]);?(?!\s*['"`])/g;
exports.IMPORT_TSX_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.tsx(\s*['"`]);?(?!\s*['"`])/g;
var scriptReplacer = function (_, p1, p2) { return p1 + ".js" + p2; };
var replaceVueExt = function (script) { return script.replace(exports.IMPORT_VUE_PATH_RE, scriptReplacer); };
exports.replaceVueExt = replaceVueExt;
var replaceTSExt = function (script) { return script.replace(exports.IMPORT_TS_PATH_RE, scriptReplacer); };
exports.replaceTSExt = replaceTSExt;
var replaceJSXExt = function (script) { return script.replace(exports.IMPORT_JSX_PATH_RE, scriptReplacer); };
exports.replaceJSXExt = replaceJSXExt;
var replaceTSXExt = function (script) { return script.replace(exports.IMPORT_TSX_PATH_RE, scriptReplacer); };
exports.replaceTSXExt = replaceTSXExt;
function compileScript(script, file) {
    return __awaiter(this, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.transformAsync(script, {
                        filename: file,
                    })];
                case 1:
                    code = (_a.sent()).code;
                    code = compileStyle_1.extractStyleDependencies(file, code, compileStyle_1.IMPORT_CSS_RE, 'css', false);
                    code = compileStyle_1.extractStyleDependencies(file, code, compileStyle_1.IMPORT_LESS_RE, 'less', false);
                    code = exports.replaceVueExt(code);
                    code = exports.replaceTSXExt(code);
                    code = exports.replaceJSXExt(code);
                    code = exports.replaceTSExt(code);
                    fs_extra_1.removeSync(file);
                    fs_extra_1.writeFileSync(fsUtils_1.replaceExt(file, '.js'), code, 'utf8');
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileScript = compileScript;
function compileScriptFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var sources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sources = fs_extra_1.readFileSync(file, 'utf-8');
                    return [4 /*yield*/, compileScript(sources, file)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileScriptFile = compileScriptFile;
function compileLibraryEntry(dir, publicDirs) {
    return __awaiter(this, void 0, void 0, function () {
        var imports, plugins, constInternalComponents, cssImports, lessImports, publicComponents, install, indexTemplate, styleTemplate, umdTemplate, lessTemplate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imports = [];
                    plugins = [];
                    constInternalComponents = [];
                    cssImports = [];
                    lessImports = [];
                    publicComponents = [];
                    publicDirs.forEach(function (dirname) {
                        var publicComponent = fsUtils_1.bigCamelize(dirname);
                        publicComponents.push(publicComponent);
                        imports.push("import " + publicComponent + ", * as " + publicComponent + "Module from './" + dirname + "'");
                        constInternalComponents.push("export const _" + publicComponent + "Component = " + publicComponent + "Module._" + publicComponent + "Component || {}");
                        plugins.push(publicComponent + ".install && app.use(" + publicComponent + ")");
                        cssImports.push("import './" + dirname + "/style'");
                        lessImports.push("import './" + dirname + "/style/less'");
                    });
                    install = "\nfunction install(app) {\n  " + plugins.join('\n  ') + "\n}\n";
                    indexTemplate = imports.join('\n') + "\n\n" + constInternalComponents.join('\n') + "\n\n" + install + "\nexport {\n  install,\n  " + publicComponents.join(',\n  ') + "\n}\n\nexport default {\n  install,\n  " + publicComponents.join(',\n  ') + "\n}\n";
                    styleTemplate = cssImports.join('\n') + "\n";
                    umdTemplate = imports.join('\n') + "\n\n" + cssImports.join('\n') + "\n\n" + install + "\nexport {\n  install,\n  " + publicComponents.join(',\n  ') + "\n}\n\nexport default {\n  install,\n  " + publicComponents.join(',\n  ') + "\n}\n";
                    lessTemplate = lessImports.join('\n') + "\n";
                    return [4 /*yield*/, Promise.all([
                            fs_extra_1.writeFile(path_1.resolve(dir, 'index.js'), indexTemplate, 'utf-8'),
                            fs_extra_1.writeFile(path_1.resolve(dir, 'umdIndex.js'), umdTemplate, 'utf-8'),
                            fs_extra_1.writeFile(path_1.resolve(dir, 'style.js'), styleTemplate, 'utf-8'),
                            fs_extra_1.writeFile(path_1.resolve(dir, 'less.js'), lessTemplate, 'utf-8'),
                        ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileLibraryEntry = compileLibraryEntry;
