<!--  -->
<template>
  <div id="category">
    <nav-bar class="navbar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
        <div>
          <tab-content-category :list = list></tab-content-category>
          <tab-content-detail :list = list></tab-content-detail>
        </div>
        
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabContentCategory from "./childComs/TabContentCategory.vue";
import TabContentDetail from "./childComs/TabContentDetail.vue"
import { getCategory }from 'network/category'
export default {
  name:"Category",
  components: {
  NavBar,
  TabContentCategory,
  TabContentDetail,
  },
  data() {
    return {
      list:[]
    };
  },
  created(){
    getCategory().then((res) => {
      this.list = res.data.category.list
    });
  },
  methods:{
  }
};
</script>

<style  scoped>
.navbar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
