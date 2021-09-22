const { promisify } = require('util')
const clear = require('clear')
const chalk = require('chalk')
const figlet = promisify(require('figlet'))
const logChalk = (str) => console.info(chalk.green(str))
const download = require('download-git-repo')
const log = require('./log')

module.exports = async (name) => {
  clear()
  const data = await figlet('bs-cli welcome')
  logChalk(data)

  const repo =
    'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git#main'

  const ora = require('ora')

  const process = ora({
    text: 'loading',
    prefixText: '🚴🏻Download from template...',
    color: 'gray',
  })

  process.start()

  await download(repo, name, { clone: true }, (err) => {
    // 个人分析出的两种错误情况：1 同目录项目名已存在 2 储存库出现问题
    if (err) return process.fail('项目已存在或存储库错误！')
    // 创建成功 提示
    setTimeout(() => {
      process.succeed(chalk.green('模板下载成功'))
      console.log(
        `
        ▄████ ▓█████▄  ██▓███    ▄████     ▄████▄   ██▓     ██▓
        ██▒ ▀█▒▒██▀ ██▌▓██░  ██▒ ██▒ ▀█▒   ▒██▀ ▀█  ▓██▒    ▓██▒
        ▒██░▄▄▄░░██   █▌▓██░ ██▓▒▒██░▄▄▄░   ▒▓█    ▄ ▒██░    ▒██▒
        ░▓█  ██▓░▓█▄   ▌▒██▄█▓▒ ▒░▓█  ██▓   ▒▓▓▄ ▄██▒▒██░    ░██░
        ░▒▓███▀▒░▒████▓ ▒██▒ ░  ░░▒▓███▀▒   ▒ ▓███▀ ░░██████▒░██░
        ░▒   ▒  ▒▒▓  ▒ ▒▓▒░ ░  ░ ░▒   ▒    ░ ░▒ ▒  ░░ ▒░▓  ░░▓  
        ░   ░  ░ ▒  ▒ ░▒ ░       ░   ░      ░  ▒   ░ ░ ▒  ░ ▒ ░
        ░ ░   ░  ░ ░  ░ ░░       ░ ░   ░    ░          ░ ░    ▒ ░
            ░    ░                   ░    ░ ░          ░  ░ ░  
                ░                          ░                                                                                                                                                              
    `
      )
      log.success(`🎉  Successfully created project ${name}.`)
      log.success('👉  Get started with the following commands:\n')
      log.bash(`cd ${name}`)
      log.bash(`yarn install`)
    }, 50)
  })
}
