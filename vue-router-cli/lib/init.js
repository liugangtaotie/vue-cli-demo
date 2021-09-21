// 打印欢迎界面
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = (content) => console.log(chalk.green(content))
const { clone } = require('./download')
const open = require('open')

const download = require('download-git-repo')

const spawn = async (...args) => {
  // 同步 Promise api

  const { spawn } = require('child_process')
  return new Promise((resolve) => {
    const proc = spawn(...args)
    // 输出流 子进程 合并到 主进程
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async (name) => {
  // 打印欢迎界面
  clear()
  const data = await figlet('KKB Welcome')
  log(data)

  // 项目模板
  log('🚀创建项目' + name)
  // await clone(
  //   'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git',
  //   name
  // )

  const repo =
    'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git'

  const ora = require('ora')

  const process = ora(`下载....${repo}`)

  process.start()

  setTimeout(() => {
    process.color = 'yellow'
    process.text = 'Loading rainbows'
  }, 1000)

  await download(repo, name, { clone: true }, (err) => {
    // 个人分析出的两种错误情况：1 同目录项目名已存在 2 储存库出现问题
    if (err) return console.log('项目已存在或存储库错误！')
    // 创建成功 提示
    console.log('vue项目创建成功')
  })

  process.succeed()

  // 下载依赖  npm i
  // 子进程
  log(`🚴🏻安装依赖....`)
  // await spawn('npm', ['install'], { cwd: `./${name}` })
  log(
    chalk.green(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `)
  )

  open('http://localhost:8080')
  // await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}
