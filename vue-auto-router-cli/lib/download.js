const { promisify } = require('util')

module.exports.clone = async function (repo, desc) {
  const download = promisify(require('download-git-repo'))

  // const ora = require('ora')

  // const process = ora(`下载....${repo}`)

  // process.start()
  await download(repo, desc, { clone: true }, (err) => {
    // 个人分析出的两种错误情况：1 同目录项目名已存在 2 储存库出现问题
    if (err) return console.log('项目已存在或存储库错误！')
    // 创建成功 提示
    console.log('vue项目创建成功')
  })

  // process.succeed()
}
