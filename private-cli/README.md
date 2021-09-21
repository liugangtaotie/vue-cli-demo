# private-cli
私有库搭建CLI脚手架

# 本地环境调试
```
npm link
private init template
```

# 安装
```
npm install -g @private/cli
# 或者
yarn global add @private/cli
```
你可以用这个命令来检查其版本是否正确：
```
private --version
```

# 升级
如需升级全局的 Private CLI 包，请运行：
```
npm update -g @private/cli
# 或者
yarn global upgrade --latest @private/cli
```

# 部署npm
```
npm login  输入你的用户名、密码、邮箱
npm publish 发布
```

# 更新版本号
```
npm version patch
npm version minor
npm version major
```

# 坑位解决
如果npm设置了淘宝镜像，请换回原来的npm下载地址
```
npm config set registry https://registry.npmjs.org
```
查看当前npm源
```
npm config ls
```

# 更新日志：

## 0.0.1
- ✨拉取内网仓库前端模板
