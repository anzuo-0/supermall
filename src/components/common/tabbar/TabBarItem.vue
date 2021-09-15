<!--  -->
<template>
 <div class="tab-bar-item" @click="itemClick()">
    <div v-if = "!isActive"><slot  name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type: String,
      default:"red"
    }
  },
  components: {
  },
  data () {
    return {
      // isActive:true
    }
  },
  computed: {
    isActive(){
      // 判断当前活跃状态下的path是否包含这个path
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color : this.activeColor}:{}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }

  }
}
</script>

<style  scoped>
.tab-bar-item{
  /* 平分 */
  flex: 1;
  /* 居中 */
  text-align: center;
  height: 49px;
  font-size: 15px;
  
}
.tab-bar-item img{
  height: 23px;
  width: 23px;
  margin-top: 3px;
  /* 可以通过下面这个属性去掉图片与文字间的空隙 */
  vertical-align: middle;
  margin-bottom: 2px;

}
/* .active{
  color: blueviolet;
} */
</style>
