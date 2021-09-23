const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const ora = require('ora')
const open = require('open')
const log = (name) => {
  console.info(chalk.green(name))
}

const download = require('download-git-repo')
const execa = require('execa')

module.exports = async (name) => {
  clear()

  const data = await figlet('cli welcome')
  log(data)

  const process = ora(`下载模板...`)

  process.start()

  await download(
    'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip',
    name,
    { clone: true },
    (err) => {
      if (err) return console.info('有错误')

      process.stop()

      log('🎉 success🎉 ')

      // 安装依赖包
      log('🚴🏻install dependences')

      execa.commandSync('cnpm install', {
        cwd: `./${name}`,
        stdio: ['inherit', 'inherit', 'inherit'],
      })

      log('👏 👏 👏 install success')

      open('http://localhost:3000/')

      execa.commandSync('npm run dev', {
        cwd: `./${name}`,
        stdio: ['inherit', 'inherit', 'inherit'],
      })
    }
  )
}
