module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
   //代理服务器
   devServer:{
    proxy:{
      '/api':{
        target: 'http://huangmaojun2.5gzvip.idcfengye.com/bdpaltform',  //需要代理的地址， 实际生产环境需要访问的地址
        changeOrigin: true,  //是否跨域
        pathRewrite:{"^/api":""}
      }
    },
    disableHostCheck: true
  }
}