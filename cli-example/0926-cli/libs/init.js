const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const ora = require('ora')
const execa = require('execa')
const log = (name) => {
  console.info(chalk.green(name))
}
const open = require('open')
const download = require('download-git-repo')

module.exports = async (name) => {
  clear()

  const data = figlet.textSync('0926-cli')

  log(data)

  const repo =
    'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip'

  const process = ora('下载模板....')

  process.start()

  // 下载模板
  await download(repo, name, { clone: true }, (err) => {
    if (err) return log('模板下载出错')

    process.succeed()
    log(' 🎉下载成功 🎉')

    // 安装依赖
    log('👉 👉 安装依赖')
    execa.commandSync('cnpm install', {
      cwd: `./${name}`,
      stdio: ['inherit', 'inherit', 'inherit'],
    })

    log(' 🎉安装依赖成功 🎉')

    open('http://localhost:3000/')

    execa.commandSync('npm run dev', {
      cwd: `./${name}`,
      stdio: ['inherit', 'inherit', 'inherit'],
    })
  })
}
