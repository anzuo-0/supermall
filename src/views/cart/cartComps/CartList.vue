<!-- 列表大的组件 -->
<template>
  <div class="cart-list">
    <scroll class="cart-content" ref="scroll">
       <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem.vue'
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
      ...mapGetters(['cartList'])
  },
  activated () {
    // 在使用better-scroll的时候，高度没更新导致不能滚动，所以使用refresh
    this.$refs.scroll.refresh()
  }
};
</script>

<style  scoped>
.cart-list{
  height: calc(100% - 44px - 49px -35px);
}
.cart-content {
  height: 100%;
  overflow: hidden;
}
</style>
