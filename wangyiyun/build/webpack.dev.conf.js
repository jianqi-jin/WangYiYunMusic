'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

//引入axios模块
//const axios = require('axios')

//引入request模块
const request = require('request')

//引入APIenc加密模块
const enc = require('../API_ENC/enc.js')

//引入api模块（网易云接口）

const api = require('../API_ENC/api')

//导入本地数据
const data = require('../static/data')

//引入cheerio模块(HTML处理模块)
const cheerio = require('cheerio')

//设置本地API模拟或代理
//const appData = require('./data')//加载本地数据
//

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    //此处设置代理API
    before(app) {
      app.get('/api/test', (req, res) => {
        console.log(req.query.data)
        console.log('{"s":"'+req.query.data+'","limit":"8","csrf_token":""}')
        const h = enc.enc('{"s":"'+req.query.data+'","limit":"8","csrf_token":""}')
        const _data = 'params='+h.encText+'&encSecKey='+h.encSecKey
        //const _data='params=I9poLQX4QhYUqTlGJ0BuBqrBGfjgpwEOy91ZkftCJVKEh2fEs0EMzJOgYGDTmEyz4GAwdhdAeZ3L0oQU%2BCcmJEBODxiqBinxplaKGtUpfp8%3D&encSecKey=cc402fbec71e6483371fdfc6f7e14701f54b8d0b731617803436647fa1ca8db8e77236287d4be8b21336f04d527e10a7948b6da773d3a5de638b0005a194fc6c48fa6e5de32dcf891c388feec4c97ec4c6b3b6bd208c1389d6776d1cbc16425c9e15847bdb42257390030a5b2660ab6d1db81200d4458f9f6d9e6640b7393f16'
        console.log(_data)
        try{
          request.post({
            url:'https://music.163.com/weapi/search/suggest/web?csrf_token=',
            form:_data,
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
              'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
            }
          }, (error, response) => {
            if(response.body && response.body.length > 1){
              console.log(response.body)
              try{
                res.json({
                  error:0,
                  data:JSON.parse(response.body)
                })
              }catch (e) {
                console.log(e)
              }
            }else{
              console.log('数据空')
              res.json({
                error:0,
                data:{}
              })
            }
            //console.log(response.body)
          })
        }catch (e) {

        }




        /*
        axios({
          method:'post',
          url:'https://music.163.com/weapi/search/suggest/web?csrf_token=',
          form:'params='+'2+gzI6DMDbzy/5DhwQOaE36gC1uudrpNlqJbKhxbm9w6s26q5R8bbxAgWpDAPTdoXP25uSfL+oT+RtHv04at4AOo0SEYsBVMnpnpZE3zgDc='+'&encSecKey='+'74e0e9822c8c8e1f95bf7f565e1bdac264d1716891326aa225603eeff9ac1182ee340cf4291c34a44e090bac77143e6c0a36ec2a5edf18789f622279fc8d5801279e2e610772243d4169b335656b441f3a81a1c63983dacf1d779ddbe7dc6a2295be905832b5e8268e64666d966534905a6c5b0431271805dec17837ccb9a4d8',
          header:{
            'Content-Type':'application/x-www-form-urlencoded',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
          }
        }).then(function(response) {
          console.log('--------------------------------------------')
          console.log(response)
          console.log('--------------------------------------------')
          console.log(response.data)
          console.log('--------------------------------------------')
          //res.json(response)
        })
        */
      }),
      app.post('/api/post', (req, res) => {
        res.json({
          errno: 0,
          data: 'helloPost'
        })
      })
      app.get('/api/getPlayList', (req, res) => {
        api.getPlayList(req, res)
      })
      app.get('/api/getListInfo', (req, res) => {
        api.getListInfo(req, res)
      })
      app.get('/api/getSongInfo', (req, res) => {
        api.getSongInfo(req, res)
      })
      app.get('/api/getSongLyric', (req, res) => {
        api.getSongLyric(req, res)
      })
      app.get('/api/getSongHref', (req, res) => {
        api.getSongHref(req, res)
      })
    },
    //设置完毕
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
