import path from 'path'
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (p) => path.resolve(packageDir, p)

const pkg = require(resolve('package.json'))

const name = path.basename(packageDir)

console.info('name', name)

const outputConfig = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es',
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs',
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife',
  },
}

const options = pkg.buildOptions

function createConfig(format, output) {
  output.name = options.name
  output.sourcemap = true

  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      resolvePlugin(),
    ],
  }
}

export default options.formats.map((format) => {
  createConfig(format, outputConfig[format])
})
