import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入icon图标
import './assets/icons/icon/iconfont.css'


// 导入axios 包
import axios from 'axios'
axios.defaults.baseURL='/api'
// 设置请求头
/* axios.defaults.headers.post['Content-Type'] = 'application/json' */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// 把包挂载到vue的原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
