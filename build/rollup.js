const path = require('path')
const rollup = require('rollup')
const reslove = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')

const inputOptions = {
  input: path.join(__dirname, '../src/index.js'),
  plugins: [babel(), reslove()]
}

const outOptions = {
  format: 'umd',
  name: 'main',
  file: path.join(__dirname, `../dist/main.js`)
}

async function build() {
  const bundle = await rollup.rollup(inputOptions);

  await bundle.write(outOptions);
}

build()
