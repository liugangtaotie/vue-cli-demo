"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileLess = exports.extractStyleDependencies = exports.normalizeStyleDependency = exports.clearEmptyLine = exports.STYLE_IMPORT_RE = exports.IMPORT_LESS_RE = exports.IMPORT_CSS_RE = exports.EMPTY_LINE_RE = exports.EMPTY_SPACE_RE = void 0;
var fs_extra_1 = require("fs-extra");
var less_1 = require("less");
var fsUtils_1 = require("../shared/fsUtils");
var path_1 = require("path");
exports.EMPTY_SPACE_RE = /[\s]+/g;
exports.EMPTY_LINE_RE = /[\n\r]*/g;
exports.IMPORT_CSS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.css)['"]\s*;?(?!\s*['"`])/g;
exports.IMPORT_LESS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.less)['"]\s*;?(?!\s*['"`])/g;
exports.STYLE_IMPORT_RE = /@import\s+['"](.+)['"]\s*;/g;
var TildeResolver = /** @class */ (function (_super) {
    __extends(TildeResolver, _super);
    function TildeResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TildeResolver.prototype.loadFile = function (filename) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        filename = filename.replace('~', '');
        return _super.prototype.loadFile.apply(this, __spreadArray([filename], __read(args)));
    };
    return TildeResolver;
}(less_1.FileManager));
var TildeResolverPlugin = {
    install: function (lessInstance, pluginManager) {
        pluginManager.addFileManager(new TildeResolver());
    },
};
var clearEmptyLine = function (s) { return s.replace(exports.EMPTY_LINE_RE, '').replace(exports.EMPTY_SPACE_RE, ' '); };
exports.clearEmptyLine = clearEmptyLine;
function normalizeStyleDependency(styleImport, reg) {
    var relativePath = styleImport.replace(reg, '$1');
    relativePath = relativePath.replace(/(.less)|(\.css)/, '');
    if (relativePath.startsWith('./')) {
        return '.' + relativePath;
    }
    return '../' + relativePath;
}
exports.normalizeStyleDependency = normalizeStyleDependency;
function extractStyleDependencies(file, code, reg, expect, self) {
    var _a;
    var _b = path_1.parse(file), dir = _b.dir, base = _b.base;
    var styleImports = (_a = code.match(reg)) !== null && _a !== void 0 ? _a : [];
    var cssFile = path_1.resolve(dir, './style/index.js');
    var lessFile = path_1.resolve(dir, './style/less.js');
    styleImports.forEach(function (styleImport) {
        var normalizedPath = normalizeStyleDependency(styleImport, reg);
        fsUtils_1.smartAppendFileSync(cssFile, "import '" + normalizedPath + ".css'\n");
        fsUtils_1.smartAppendFileSync(lessFile, "import '" + normalizedPath + "." + expect + "'\n");
    });
    if (self) {
        fsUtils_1.smartAppendFileSync(cssFile, "import '" + normalizeStyleDependency(base, reg) + ".css'\n");
        fsUtils_1.smartAppendFileSync(lessFile, "import '" + normalizeStyleDependency(base, reg) + "." + expect + "'\n");
    }
    return code.replace(reg, '');
}
exports.extractStyleDependencies = extractStyleDependencies;
function compileLess(file) {
    return __awaiter(this, void 0, void 0, function () {
        var source, css;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    source = fs_extra_1.readFileSync(file, 'utf-8');
                    return [4 /*yield*/, less_1.render(source, {
                            filename: file,
                            plugins: [TildeResolverPlugin],
                        })];
                case 1:
                    css = (_a.sent()).css;
                    fs_extra_1.writeFileSync(fsUtils_1.replaceExt(file, '.css'), exports.clearEmptyLine(css), 'utf-8');
                    return [2 /*return*/];
            }
        });
    });
}
exports.compileLess = compileLess;
