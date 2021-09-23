const clear = require('clear')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const { handleDownload } = require('./download')
const logChalk = (str) => console.info(chalk.green(str))

const PROMPT_LIST = [
  {
    type: 'input',
    message: 'enter your projectName',
    name: 'projectName',
    default: 'test',
  },
  {
    type: 'list',
    message: 'choose download template',
    name: 'templateName',
    choices: ['mobile', 'web'],
  },
]

function entry() {
  inquirer.prompt(PROMPT_LIST).then(async (answer) => {
    handleDownload(answer)
  })
}

module.exports = async () => {
  clear()
  const data = await figlet('bs-cli welcome')
  logChalk(data)
  await entry()
}
