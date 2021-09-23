const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')

const RepositoryList = {
  'test-vue':
    'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip',
}

// 下载主方法
function downloadTemplate(options) {
  return new Promise((resolve) => {
    const CURRENT_PATH = process.cwd() // 获取当前路径
    const { projectName, templateName } = options // 获取用户填写的选项
    const targetPath = path.resolve(CURRENT_PATH, projectName) // 目标路径
    const rpUrl = RepositoryList[templateName] // 下载的地址
    download(rpUrl, targetPath, {}, (err) => {
      if (err) {
        console.log(err)
        resolve(false)
      }
      resolve(true)
    })
  })
}

// 处理下载事件
async function handleDownload(options) {
  const newOra = ora('start download template').start()
  try {
    let downloadResult = await downloadTemplate(options)
    downloadResult
      ? newOra.succeed('download template success')
      : newOra.fail('download fail')
  } catch (err) {
    console.log(err)
    newOra.fail('download fail')
  }
}

module.exports = { handleDownload }
