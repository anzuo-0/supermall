import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'network/axios'
import store from './store'
// 导入这个插件组件
import toast from 'components/common/toast/index'
// 安装
Vue.use(toast)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 设置bus
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
