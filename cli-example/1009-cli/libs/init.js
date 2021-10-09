const figlet = require('figlet')
const chalk = require('chalk')

const log = (msg) => {
  console.info(chalk.green(msg))
}

const download = require('download-git-repo')

const execa = require('execa')
const open = require('open')

module.exports = async (name) => {
  console.info('2222')

  const data = figlet.textSync('1009-cli welcome')

  log(data)

  log('🚴🏻下载模板')

  const repo =
    'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip'

  await download(repo, name, { clone: true }, (err) => {
    if (err) return '出错了'

    log('👏下载模板成功👏')

    log('🚀安装依赖')

    execa.commandSync('npm install', {
      cwd: `./${name}`,
      stdio: [2, 2, 2],
    })

    log('安装依赖成功')

    open('http://localhost:3000/')

    execa.commandSync('npm run dev', {
      cwd: `./${name}`,
      stdio: [2, 2, 2],
    })
  })
}
