<!-- 轮播图下面的推荐 -->
<template>
  <div class="recommend">
    <div class="recommend-item" v-for = "item in recommends" :key="item.id" >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  // 从home拿到数据
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {};
  },
};
</script>

<style  scoped>
.recommend {
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  padding-bottom: 25px;
  border-bottom: 8px solid #eee;
  text-align: center;
}
.recommend-item {
  flex: 1;
}
.recommend img {
  width: 65px;
  height: 65px;
  margin-bottom: 8px;
}
</style>
