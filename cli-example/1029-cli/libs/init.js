const ora = require('ora')
const open = require('open')
const execa = require('execa')
const figlet = require('figlet')
const { green } = require('kolorist')
const download = require('download-git-repo')
const log = (msg) => {
  console.info(green(msg))
}

module.exports = async (name) => {
  const data = figlet.textSync('1015 welcome')
  log(data)

  // downloading template

  log(`🚴🏻downloading template...`)

  const process = ora(`🚴🏻downloading template...`)

  process.start()

  const repo =
    'direct:https://bitbucket.org/JeremyYu_1122/vue-test/get/master.zip'

  await download(repo, name, { clone: true }, (err) => {
    if (err) return console.info('error')

    process.stop()

    // 🚴🏻downloaded sucess
    log('\n🎉downloaded sucess🎉')

    execa.commandSync('npm install', {
      cwd: `./${name}`,
      stdio: [2, 2, 2],
    })

    log('\n👏 👏 👏 install success')

    open('http://localhost:3000/')

    execa.commandSync('npm run dev', {
      cwd: `./${name}`,
      stdio: [2, 2, 2],
    })
  })
}
