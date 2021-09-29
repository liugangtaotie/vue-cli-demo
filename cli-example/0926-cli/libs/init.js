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
const { green, bold } = require('nanocolors')

module.exports = async (name) => {
  clear()

  const data = figlet.textSync('0926-cli')

  log(data)

  console.log(green(`Task ${bold('1')} was finished`))

  // const readline = require('readline')
  // const question = ['请输入您的姓名', '请输入您的年龄']
  // const result = []
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  //   prompt: `？${question[0]} `,
  // })
  // rl.prompt()

  // rl.on('line', (line) => {
  //   result.push(line.trim())
  //   const max = result.length
  //   if (max === question.length) {
  //     rl.close()
  //   }
  //   rl.setPrompt(`？${question[max]} `)
  //   rl.prompt()
  // }).on('close', () => {
  //   console.log(`谢谢参与问答 *** 姓名: ${result[0]} 年龄: ${result[1]}`)
  //   process.exit(0)
  // })

  // const readline = require('readline')
  // let selected = 0
  // const choices = ['javascript', 'css', 'html']
  // let lineCount = 0
  // const rl = readline.createInterface(process.stdin, process.stdout)
  // function reader() {
  //   let str = ''
  //   for (let i = 0; i < choices.length; i++) {
  //     lineCount++
  //     str += `${selected === i ? '[X]' : '[ ]'} ${choices[i]}\r\n`
  //   }
  //   process.stdout.write(str)
  // }

  // reader()

  // process.stdin.on('keypress', (s, key) => {
  //   const name = key.name
  //   const max = choices.length
  //   if (name === 'up' && selected > 0) {
  //     selected--
  //   } else if (name === 'down' && selected < max - 1) {
  //     selected++
  //   } else if (name === 'down' && selected === max - 1) {
  //     selected = 0
  //   } else if (name === 'up' && selected === 0) {
  //     selected = max - 1
  //   } else {
  //     return true
  //   }
  //   // 移动光标至起始位置，确保后续输入覆盖当前内容
  //   readline.moveCursor(process.stdout, 0, -lineCount)
  //   lineCount -= choices.length
  //   reader()
  // })

  // rl.on('line', () => {
  //   console.log(`you choose ${choices[selected]}`)
  //   process.exit(0)
  // }).on('close', () => {
  //   rl.close()
  // })

  const yargs = require('yargs/yargs')
  const { hideBin } = require('yargs/helpers')

  yargs(hideBin(process.argv))
    .command(
      'serve [port]',
      'start the server',
      (yargs) => {
        return yargs.positional('port', {
          describe: 'port to bind on',
          default: 5000,
        })
      },
      (argv) => {
        if (argv.verbose) console.info(`start server on :${argv.port}`)
        serve(argv.port)
      }
    )
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
    })
    .parse()

  // const repo =
  //   'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip'

  // const process = ora('下载模板....')

  // process.start()

  // // 下载模板
  // await download(repo, name, { clone: true }, (err) => {
  //   if (err) return log('模板下载出错')

  //   process.succeed()
  //   log(' 🎉下载成功 🎉')

  //   // 安装依赖
  //   log('👉 👉 安装依赖')
  //   execa.commandSync('cnpm install', {
  //     cwd: `./${name}`,
  //     stdio: ['inherit', 'inherit', 'inherit'],
  //   })

  //   log(' 🎉安装依赖成功 🎉')

  //   open('http://localhost:3000/')

  //   execa.commandSync('npm run dev', {
  //     cwd: `./${name}`,
  //     stdio: ['inherit', 'inherit', 'inherit'],
  //   })
  // })
}
