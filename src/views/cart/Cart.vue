<!--  -->
<template>
  <div class="cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-button-bar/>
  </div>
 
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./cartComps/CartList.vue"
import { mapGetters } from "vuex";
import CartButtonBar from './cartComps/CartBottomBar.vue';
export default {
  components: { 
    NavBar,
    CartList,
    CartButtonBar,
     },
  data() {
    return {};
  },
  computed: {
    // 这是数组的写法,
    // ...mapGetters(["cartlength", "cartList"]),
    // 这是对象的写法，可以自己命名，但是数组不行
    ...mapGetters({
      length: "cartlength",
      list: "cartList",
    }),
  },
};
</script>

<style  scoped>
.cart{
  height: 100vh;
}
.cart-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
