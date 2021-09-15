<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <!-- exclude="Detail"将Detail排除在外，就会重新执行Detail，每一次的详情就会不同 -->
      <router-view />
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/maintabbar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";

#app {
  position: relative;
}
</style>
