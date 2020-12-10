module.exports = {
  productionSourceMap: false,
  devServer: {  //https://api.aikesaisi.com
    proxy: {
      '/api': {
        target: 'http://lxpc.aikesaisi.com',//需要发送到的服务器域名地址
        ws: true,
        changeOrigin: true,   // 是否跨域
        pathRewrite: {
          '^/api': '/'    // 重写
        }
      }
    }
  },
    // 自定义打包入口文件
    chainWebpack:config => {
      // 为build 编译模式 打包入口文件 
      config.when(process.env.NODE_ENV === 'production',config=>{
          config.entry('app').clear().add('./src/main-prod.js')
          // 通过 externals 加载外部 CDN 资源  配置如下
          config.set('externals', {
              vue: 'Vue',
             'vue-router': 'router',
             axios: 'axios',
          })
          // 首页内容定制
          config.plugin('html').tap(args => {
              args[0].isProd = true
              return args
          })
      })
      // 开发模式入口打包文件
      config.when(process.env.NODE_ENV === 'development',config=>{
          config.entry('app').clear().add('./src/main-dev.js')
          // 首页内容定制
          config.plugin('html').tap(args => {
              args[0].isProd = false
              return args
          })
      })
      
  }
}
