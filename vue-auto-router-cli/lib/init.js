// 凡所有相皆是虚妄
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')

const log = (content) => console.log(chalk.green(content))

const { clone } = require('./download')

const download = require('download-git-repo')

//获得命令运行时的路径
const getCwd = () => process.cwd() + '/'
const spawnTrue = async (...args) => {
  const { spawn } = require('child_process')
  const options = args[args.length - 1]
  if (process.platform === 'win32') {
    options.shell = true
  } else {
    return
  }
  return new Promise((resolve) => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async (name) => {
  clear()

  const data = await figlet('kkkk welcom')
  log(data)

  // 下载
  log('🚀创建项目' + name)

  const repo =
    'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git'

  const ora = require('ora')

  const process = ora(`下载....${repo}`)

  process.start()

  // setTimeout(() => {
  //   process.color = 'yellow'
  //   process.text = 'Loading rainbows'
  // }, 1000)

  await download(repo, name, { clone: true }, (err) => {
    // 个人分析出的两种错误情况：1 同目录项目名已存在 2 储存库出现问题
    if (err) return console.log('项目已存在或存储库错误！')
    // 创建成功 提示
    console.log('vue项目创建成功')
  })

  process.succeed()

  // await clone(
  //   'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git',
  //   name
  // )

  // log('开始安装依赖')

  // const processLink = ora(`开始安装依赖`)
  // processLink.start()
  // await spawnTrue('npm', ['install'], { cwd: `${getCwd()}${name}` })
  // processLink.succeed()

  // log('安装依赖')
  // await spawnTest('cnpm', ['install'], { cwd: `./${name}` })
  // log(
  //   chalk.green(`
  //   🆗 安装完成：
  //   To get Start:
  //   ===========================
  //   cd ${name}
  //   npm run serve
  //   ===========================
  //     `)
  // )
}
