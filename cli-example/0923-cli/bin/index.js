#!/usr/bin/env node
const program = require('commander')

program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init a project')
  .action(require('../libs/init'))

program.parse(process.agrv)
