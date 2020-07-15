// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

const TARGET_NODE = process.env.TARGET_NODE === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV !== 'production'

console.log('process.env.TARGET_NODE: ', process.env.TARGET_NODE)
console.log('NODE_ENV: ', process.env.NODE_ENV)
module.exports = {
  publicPath: isDev ? 'http://127.0.0.1:8080' : 'http://127.0.0.1:3001',
  configureWebpack: {
    entry: `./src/entry-${target}.js`,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件。
    externals: TARGET_NODE ?
      nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        allowlist: [/\.css$/]
      }) :
      undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    // VueSSRServerPlugin 是将服务器的整个输出构建为单个 JSON 文件的插件。默认文件名为 `vue-ssr-server-bundle.json`
    // VueSSRClientPlugin 插件在输出目录中生成 `vue-ssr-client-manifest.json`
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
  },

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return options
      })
  }
}