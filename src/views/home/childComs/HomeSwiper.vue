<!--  -->
<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index" >
      <a :href="item.link">
        <img :src="item.image" alt=""
          @load="imageLoad"
         />
       
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
   banners: {
      type: Array,
      default: () => [] // 默认值是空数组
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
 
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    },
    imageLoad(){
      // 如果已经发出过事件，则不需要发出第二次
      if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad =true
      }
    },

  },
};
</script>

<style  scoped>
</style>
