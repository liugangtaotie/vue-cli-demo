const { promisify } = require('util')
const clear = require('clear')
const chalk = require('chalk')
const figlet = promisify(require('figlet'))
const log = (str) => console.info(chalk.green(str))
const download = require('download-git-repo')

module.exports = async (name) => {
  clear()
  const data = await figlet('bs-cli welcome')
  log(data)

  const repo =
    'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git#main'

  const ora = require('ora')

  const process = ora(`🚴🏻下载....${repo}`)

  process.start()

  await download(repo, name, { clone: true }, (err) => {
    // 个人分析出的两种错误情况：1 同目录项目名已存在 2 储存库出现问题
    if (err) return console.log('项目已存在或存储库错误！')
    // 创建成功 提示
    console.log('vue项目创建成功')
  })

  process.succeed()
}
