import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'network/axios'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
// 导入这个插件组件
import toast from 'components/common/toast/index'
// 安装
Vue.use(toast)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 设置bus
Vue.prototype.$bus = new Vue()

// 解决移动端300ms的延迟
FastClick.attach(document.body);
Vue.use(VueLazyload)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
