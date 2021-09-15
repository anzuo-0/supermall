<!-- 详情页的轮播图 -->
<template>
<swiper class="detail-swiper">
  <!-- 要注意重名的问题 -->
  <swiper-item v-for="item in topImages" :key="item.id">
    <img :src="item" alt="" srcset="">
  </swiper-item>
</swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  data () {
    return {
    }
  },
  components: {
    Swiper,
    SwiperItem,
  
  },
  // 拿到detail.vue的数据
  props: {
   topImages:{
     type:Array,
     default(){
       return []
     }
   }
  },
}
</script>

<style  scoped>
.detail-swiper{
  height: 300px;
}
</style>
