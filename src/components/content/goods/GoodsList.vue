<!-- 首页商品数据的展示 -->
<template>
  <div class="goodslist">
    <goods-list-item
     v-for="item in goods" 
     :key="item.id" 
     :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  components: {
    GoodsListItem,
  },
  data() {
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },

};
</script>

<style  scoped>
/* 让一行放两个 */
.goodslist {
  display: flex;
  flex-wrap: wrap;
  /* 平分 */
  justify-content: space-around;

  padding: 2px;
}
</style>
