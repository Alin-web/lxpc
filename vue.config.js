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
  }
}
