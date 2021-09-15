import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'
import getters from './getters'

// 安装插件
Vue.use(Vuex);

// 创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
    // addCart(state, payload) {
    //   // 判断购物车是否加了同样的商品，如果有就
    //   let oldProduct = null
    //   for (let item of state.cartList) {
    //     if (item.iid === payload.iid) {
    //       oldProduct = item
    //     }
    //   }
    //   // 判断是否有旧的商品，如果有数量加1，没有就等于1
    //   if (oldProduct) {
    //     oldProduct.count += 1
    //   } else {
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   } 
    // }
    // 也可以使用数组的find方法进行查找
    // let product = state.cartList.find(item => item.iid === payload.iid)
    // mutation唯一的目的就是修改state里面的状态
    // 在我们使用mutation的时候尽量做单一的事，此时的mutation不仅要计算数量，还要看iid,所以我们在action再做一次处理

  //   addCounter(state, payload) {
  //     payload.count++
  //   },
  //   addToCart(state, payload) {
  //     state.cartList.push(payload)
  //   }
  // },
  // 在这里做一个重构
  actions,
    // addCart(context, payload) {
    //   let oldProduct = null
    //   for (let item of context.state.cartList) {
    //     if (item.iid === payload.iid) {
    //       oldProduct = item
    //     }
    //   }
    //   if (oldProduct) {
    //     // oldProduct.count += 1
    //     context.commit('addCart', oldProduct)
    //   } else {
    //     payload.count = 1
    //     context.commit('addToCart', payload)
    //   }
    // }
  getters,
})
// 导出后挂载到Vue实例上

export default store