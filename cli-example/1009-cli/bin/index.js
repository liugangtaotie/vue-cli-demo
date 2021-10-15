#!/usr/bin/env node

const cli = require('cac')()

cli.version(require('../package.json').version)

cli.command('init <name>').action(require('../libs/init'))

cli.help()

cli.parse()
