const path = require("path");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

// common parse path
function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  publicPath: "/hcn-home-mobile/",
  assetsDir: "assets",
  outputDir: "./dist/" + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: "source-map",
    target: TARGET_NODE ? "node" : "web",
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined,
    },
    externals: TARGET_NODE
      ? nodeExternals({
          allowlist: [/\.css$/, /vant\/lib/],
        })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined,
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
  }),
  chainWebpack: (config) => {
    // 配置别名  不配置会报错
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@STA", resolve("static"))
      .set("@ASS", resolve("src/assets"))
      .set("@API", resolve("src/api"))
      .set("@COM", resolve("src/components"))
      .set("@VIE", resolve("src/views"));

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        merge(options, {
          optimizeSSR: false,
        });
      });
  },
  css: {
    extract: false,
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'tabs-default-color': 'blue',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.join(__dirname, "./src/assets/css/theme.less")}"`,
        },
      },
    },
  },
  devServer: {
    open: true,
  },
};
