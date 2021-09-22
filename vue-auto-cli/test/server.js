// nodejs 服务器
const express = require("express");
const Vue = require("vue");
const fs = require("fs");
// 创建 express 与vue 实例
const app = express();

// 创建渲染实例
const { createBundleRenderer } = require("vue-server-renderer");

// 服务端bundle
const serverBundle = require("./dist/server/vue-ssr-server-bundle.json");

// 客户端清单
const clientManifest = require("./dist/client/vue-ssr-client-manifest.json");
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync("./public/index.temp.html", "utf-8"), // 宿主模版文件
  clientManifest,
});

// 中间件处理静态文件请求
app.use("/hcn-home-mobile", express.static("./dist/client"));

// 路由的处理交给vue
app.get("*", async (req, res) => {
  try {
    const context = { url: req.url, title: "ssr" };
    // nodejs流数据，文件太大，用renderToString会卡
    const stream = renderer.renderToStream(context);
    let buffer = [];
    stream.on("data", (chunk) => {
      buffer.push(chunk);
    });
    stream.on("end", () => {
      res.end(Buffer.concat(buffer));
    });
  } catch (error) {
    res.status(500).send("服务器内部错误");
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`渲染服务器启动成功！查看：localhost:${port}`);
});
