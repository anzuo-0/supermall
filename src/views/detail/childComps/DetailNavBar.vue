<!--  -->
<template>
  <div>
 <!-- 封装导航栏 -->
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="" srcset="">
      </div>
      <div slot="center" class="title">
        <div  v-for="(item,index) in titles"
         :key="item.id" 
         class="title-item" 
         :class="{active: index === currentIndex}"
         @click="titleClick(index)">{{item}}</div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      titles:['商品','参数','评价','推荐'],
      currentIndex:0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex = index;
      // 需要将他们发射出去
      this.$emit('titleClick', index);
    },
    // 点击按钮回到上一个页面
    backClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style  scoped>
.title{
  display: flex;
  font-size: 14px;
}
.title-item{
  flex:1;
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top: 10px;
}
</style>
