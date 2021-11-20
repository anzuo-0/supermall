<!--  -->
<template>
  <div id="category">
    <nav-bar class="navbar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <scroll id="tab-content">
        <div>
          <tab-content-category></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabContentCategory from "./childComs/TabContentCategory.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";

export default {
  name:"Category",
  components: {
  NavBar,
  TabContentCategory,
  TabControl,
 
  },
  data() {
    return {};
  },
};
</script>

<style  scoped>
.navbar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
