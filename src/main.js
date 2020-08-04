import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//-------------------实现提示框
// import Message from '@/components/message/index.js'
// //引入这个是为了解决有时候图标展示不正常，可以先注释了尝试一下
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Vue.prototype.$message = Message
//-------------------实现提示框


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
