#!/usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
const execa = require('execa')
const fse = require('fs-extra') /** * 引入package.json 文件，需要用到其中的 version 字段 */
const packageJson = require('../package.json')

program
  .version(packageJson.version)
  .argument('[web-server-name]', 'web server 应用名称，英文、数字、_、-组成')
  .option('-f --force', '当项目已存在的时候强制创建项目')
  .option('-p --port <port>', '项目端口', '8888')
  .action(async (name, opts, command) => {
    const options = {
      rootDirectory: process.cwd(), // Current Work Directory
      serverName: 'app',
      dependencies: ['koa', 'nodemon', 'minimist'], // 默认安装的依赖
    }

    // 问答内容
    let promptOpts = [
      {
        type: 'checkbox',
        name: 'middlewares',
        message: '请选择要安装的中间件',
        choices: ['koa-static-cache', 'koa-router', 'koa-body'],
        default: ['koa-static-cache', 'koa-router'],
      },
    ]
    if (name) {
      options.serverName = name
    } else {
      promptOpts.unshift({
        type: 'input',
        name: 'serverName',
        message: '请输入应用名称',
        default: 'app',
      })
    }
    if (opts) {
      options.serverPort = opts.port
    } else {
      promptOpts.unshift({
        type: 'input',
        name: 'serverPort',
        message: '请输入应用端口',
        default: 8888,
      })
    }
    // res 为用户选择后的返回值
    const res = await inquirer.prompt(promptOpts)
    options.serverName = res.serverName
    options.serverPort = res.serverPort
    options.rootDirectory += `/${res.serverName}`
    options.dependencies = [...options.dependencies, ...res.middlewares]

    // 创建目录
    fse.mkdirsSync(options.rootDirectory)

    // 初始化
    const cmdInit = `npm init -y`

    execa.commandSync(cmdInit, { cwd: options.rootDirectory })

    // 安装
    const cmdInstall = `npm install ${options.dependencies.join(' ')}`

    execa.commandSync(cmdInstall, {
      cwd: options.rootDirectory,
      stdio: ['inherit', 'inherit', 'inherit'],
    })

    // 创建文件
    const content = `      
    const minimist = require('minimist');      
    const Koa = require('koa');     
   const argv = minimist(process.argv.slice(2));      
   const app = new Koa();      
   app.use((ctx, next) => {          ctx.body = 'Hello';      });      
   app.listen(argv.port, () => {          
     console.log(\`服务启动成功：http://localhost:\${argv.port}\`);      
    });`
    const entryFile = options.rootDirectory + '/app.js'
    fse.outputFileSync(entryFile, content, { encoding: 'utf-8' })
  })

program.parse(process.argv)
