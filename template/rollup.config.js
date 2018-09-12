import alias from 'rollup-plugin-strict-alias'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import minify from 'rollup-plugin-babel-minify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { eslint } from 'rollup-plugin-eslint'
import bundleSize from 'rollup-plugin-filesize'

import pkg from './package.json'

const extensions = ['.js', '.vue']

const plugins = [
  alias({
    vue: 'node_modules/vue/dist/vue.common.js'
  }),
  bundleSize(),
  eslint({
    extensions,
    exclude: ['**//*.json'],
    cache: true,
    throwOnError: true
  }),
  vue({
    css: true
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  nodeGlobals()
]

const config = {
  input: './src/main.js',
  output: {
    name: pkg.name,
    file: './dist/bundle.js',
    format: 'umd'
    // sourcemap: true
  },
  plugins: plugins
}

const isProduction = process.env.NODE_ENV === `production`
const isDevelopment = process.env.NODE_ENV === `development`

if (isProduction) {
  config.output.sourcemap = false
  config.plugins.push(minify({}))
}

if (isDevelopment) {
  config.plugins.push(livereload())
  config.plugins.push(serve({
    contentBase: '.',
    port: 8080,
    open: true
  }))
}

export default config
