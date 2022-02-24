<!-- 侧边栏 -->
<template>
  <div class="aside">
     <div class = "aside-item" v-for = "item in list" :key = item.id>
       <div :class="{active : index === currentIndex}" @click="itemClick(index)">{{item.title}}</div>
     </div>
  </div>
</template>

<script>
export default {
  name:'aside',
  data () {
    return {
      
    }
  },
}
</script>

<style  scoped>
.aside{
  display: flex; 
  flex-direction: column;
  height: 80px;
  width: 150px;
  background-color: aqua;
}
.aside-item{
  flex: auto; 
  border: 1px solid #ccc;
}
</style>
