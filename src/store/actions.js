import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  addCart(context, payload) {
    return new Promise((reslove) => {
      let oldProduct = null
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        reslove('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        reslove('添加了新的商品')
      }
    })
  }
}