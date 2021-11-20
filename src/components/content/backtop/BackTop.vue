<!-- 回到顶部 -->
<template>
   <!-- <div class="back-top" @click="backClick"> -->
     <div class="back-top" >
    <img src="~assets/images/common/top.png" alt="">
  </div>
</template>

<script>
	export default {
		name: "BackTop",
    // 直接在组件监听
    // methods: {

    //   // 在backtop里面发生的点击需要在scroll里面做出反应，所以将事件发射出去
		//   backClick(){
    //     this.$emit("backClick")
    //   }
	}
</script>

<style  scoped>
.back-top{
  position: fixed;
  right: 8px;
  bottom: 50px;
}
.back-top img{
  width: 45px;
  height: 45px;
}
</style>
