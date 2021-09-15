<!-- 推荐的商品 -->
<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommendList"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  data() {
    return {};
  },
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style  scoped>
.info-header{
margin: 5px;
}
</style>
