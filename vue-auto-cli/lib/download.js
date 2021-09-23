const ora = require('ora')
const log = require('./log')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const download = require('download-git-repo')
const logChalk = (str) => console.info(chalk.green(str))

const RepositoryList = {
  mobile:
    'direct:https://github.com/liugangtaotie/vue2-mobile-ssr-code.git#main',
  web: 'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip',
}

// download template
function downloadTemplate(options) {
  return new Promise((resolve) => {
    const CURRENT_PATH = process.cwd() // 获取当前路径
    const { projectName, templateName } = options // 获取用户填写的选项
    const targetPath = path.resolve(CURRENT_PATH, projectName) // 目标路径
    const rpUrl = RepositoryList[templateName] // 下载的地址
    download(rpUrl, targetPath, { clone: true }, (err) => {
      if (err) {
        console.log(err)
        resolve(false)
      }
      resolve(true)
    })
  })
}

// Install dependencies
async function installPackage(name) {
  logChalk('🚀install dependencies')

  execa.commandSync('cnpm install', {
    cwd: `./${name}`,
  })

  logChalk('🎉install success🎉')

  log.bash(`cd ${name}`)

  log.bash(`npm run serve`)
}

// handle download
async function handleDownload(options) {
  const newOra = ora('start download template').start()
  try {
    let downloadResult = await downloadTemplate(options)
    downloadResult
      ? newOra.succeed('download template success')
      : newOra.fail('download fail')

    // Install dependencies
    await installPackage(options.projectName)
  } catch (err) {
    console.log(err)
    newOra.fail('download fail')
  }
}

module.exports = { handleDownload }
