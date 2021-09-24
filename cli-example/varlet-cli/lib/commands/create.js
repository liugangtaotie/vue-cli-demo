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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var logger_1 = __importDefault(require("../shared/logger"));
var fsUtils_1 = require("../shared/fsUtils");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var constant_1 = require("../shared/constant");
var varlet_config_1 = require("../config/varlet.config");
var lodash_1 = require("lodash");
var varletConfig = varlet_config_1.getVarletConfig();
function create(name) {
    return __awaiter(this, void 0, void 0, function () {
        var namespace, bigCamelizeName, vueTemplate, indexTemplate, testsTemplate, exampleTemplate, localeIndexTemplate, localTemplate, componentDir, testsDir, exampleDir, exampleLocalDir, docsDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    namespace = lodash_1.get(varletConfig, 'namespace');
                    bigCamelizeName = fsUtils_1.bigCamelize(name);
                    vueTemplate = "<template>\n  <div class=\"" + namespace + "-" + name + "\"></div>\n</template>\n\n<script lang=\"ts\">\nimport { defineComponent } from 'vue'\n\nexport default defineComponent({\n  name: '" + fsUtils_1.bigCamelize(namespace) + bigCamelizeName + "'\n})\n</script>\n\n<style lang=\"less\">\n." + namespace + "-" + name + " {\n  display: flex;\n}\n</style>\n";
                    indexTemplate = "import " + bigCamelizeName + " from './" + bigCamelizeName + ".vue'\nimport type { App } from 'vue'\n\n" + bigCamelizeName + ".install = function(app: App) {\n  app.component(" + bigCamelizeName + ".name, " + bigCamelizeName + ")\n}\n\nexport const _" + bigCamelizeName + "Component = " + bigCamelizeName + "\n\nexport default " + bigCamelizeName + "\n";
                    testsTemplate = "import example from '../example'\nimport " + bigCamelizeName + " from '..'\nimport { createApp } from 'vue'\nimport { mount } from '@vue/test-utils'\n\ntest('test " + name + " example', () => {\n  const wrapper = mount(example)\n  expect(wrapper.html()).toMatchSnapshot()\n})\n\ntest('test " + name + " plugin', () => {\n  const app = createApp({}).use(" + bigCamelizeName + ")\n  expect(app.component(" + bigCamelizeName + ".name)).toBeTruthy()\n})\n";
                    exampleTemplate = "<template>\n  <app-type></app-type>\n  <" + namespace + "-" + name + "/>\n</template>\n\n<script>\nimport " + bigCamelizeName + " from '..'\nimport AppType from '@varlet/cli/site/mobile/components/AppType'\nimport { watchLang } from '@varlet/cli/site/utils'\nimport { use, pack } from './locale'\n\nexport default {\n  name: '" + bigCamelizeName + "Example',\n  components: {\n    [" + bigCamelizeName + ".name]: " + bigCamelizeName + ",\n    AppType\n  },\n  setup() {\n\n     watchLang(use)\n\n     return {\n       pack\n     }\n  }\n}\n</script>\n";
                    localeIndexTemplate = "// lib\nimport _zhCN from '../../../locale/zh-CN'\nimport _enCN from '../../../locale/en-US'\n// mobile example doc\nimport zhCN from './zh-CN'\nimport enUS from './en-US'\nimport { useLocale, add as _add, use as _use } from '../../../locale'\n\nconst { add, use: exampleUse, pack, packs, merge } = useLocale()\n\nconst use = (lang: string) => {\n  _use(lang)\n  exampleUse(lang)\n}\n\nexport { add, pack, packs, merge, use }\n\n// lib\n_add('zh-CN', _zhCN)\n_add('en-US', _enCN)\n// mobile example doc\nadd('zh-CN', zhCN)\nadd('en-US', enUS)\n";
                    localTemplate = "export default {\n\n}\n";
                    componentDir = path_1.resolve(constant_1.SRC_DIR, name);
                    testsDir = path_1.resolve(constant_1.SRC_DIR, name, constant_1.TESTS_DIR_NAME);
                    exampleDir = path_1.resolve(constant_1.SRC_DIR, name, constant_1.EXAMPLE_DIR_NAME);
                    exampleLocalDir = path_1.resolve(constant_1.SRC_DIR, name, constant_1.EXAMPLE_DIR_NAME, constant_1.EXAMPLE_LOCALE_DIR_NAME);
                    docsDir = path_1.resolve(constant_1.SRC_DIR, name, constant_1.DOCS_DIR_NAME);
                    if (fs_extra_1.pathExistsSync(componentDir)) {
                        logger_1.default.error('component directory is existed');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all([
                            fs_extra_1.outputFile(path_1.resolve(componentDir, bigCamelizeName + ".vue"), vueTemplate),
                            fs_extra_1.outputFile(path_1.resolve(componentDir, 'index.ts'), indexTemplate),
                            fs_extra_1.outputFile(path_1.resolve(testsDir, 'index.spec.js'), testsTemplate),
                            fs_extra_1.outputFile(path_1.resolve(exampleDir, 'index.vue'), exampleTemplate),
                            fs_extra_1.outputFile(path_1.resolve(exampleLocalDir, 'index.ts'), localeIndexTemplate),
                            fs_extra_1.outputFile(path_1.resolve(exampleLocalDir, 'en-US.ts'), localTemplate),
                            fs_extra_1.outputFile(path_1.resolve(exampleLocalDir, 'zh-CN.ts'), localTemplate),
                            fs_extra_1.outputFile(path_1.resolve(docsDir, 'zh-CN.md'), ''),
                            fs_extra_1.outputFile(path_1.resolve(docsDir, 'en-US.md'), ''),
                        ])];
                case 1:
                    _a.sent();
                    logger_1.default.success("Create " + name + " success!");
                    logger_1.default.success("----------------------------");
                    logger_1.default.success(name + "/");
                    logger_1.default.success("|- __tests__/ # Unit test folder");
                    logger_1.default.success("|- docs/ # Internationalized document folder");
                    logger_1.default.success("|- example/ # Mobile phone example code");
                    logger_1.default.success("|- example/locale # Example locale");
                    logger_1.default.success("|- " + bigCamelizeName + ".vue # Sfc component, You can also use jsx or tsx");
                    logger_1.default.success("|- index.ts # Component entry, the folder where the file exists will be exposed to the user");
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
