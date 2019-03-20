import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import '@/common/stylus/index.styl'
import axios from 'axios'
import store from './store'
import 'common/stylus/index.styl'
/* eslint-disable no-unused-vars */

import vConsole from 'vconsole'
console.log('test one')
fastclick.attach(document.body) // 去除移动端300ms 的点击时间的延迟
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
