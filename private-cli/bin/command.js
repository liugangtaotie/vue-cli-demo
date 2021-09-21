#!/usr/bin/env node
const glob = require('glob')
const program = require('commander')
const inquirer = require("inquirer") //命令行答询
const deleteFolder = require("../libs/file")
program.version(require('../package.json').version)

// 初始化项目
function initMethods() {
  program
    .command('init <name>')
    .description('初始化项目模板')
    .action(
      require('../libs/index')
    )
  program.parse(process.argv)
}

const list = glob.sync('*') // 遍历当前目录
if (list.includes("template")) {  //template代表你自己项目模板名称
  inquirer
    .prompt([
      {
        type: "input",
        name: "delJudge",
        message: "当前目录已存在模板项目，是否删除重新创建，Yes Or No",
      }
    ])
    .then((answers) => {
      if (answers.delJudge.toLowerCase() === "yes") {
        deleteFolder(`${process.cwd()}/template`)
          .then(() => {
            initMethods()
          })
          .catch(() => {
            process.exit()
          })
      } else {
        process.exit()
      }
    })
} else {
  initMethods()
}