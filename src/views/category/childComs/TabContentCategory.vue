<!--  -->
<template>
  <div class="aside">
    <div class = "aside-item"  v-for="(item,index) in list" :key="item.id">
      <div :class="{active : index === currentIndex}" @click="itemClick(index)">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabContentCategory',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      currentIndex : 0
    };
  },
  methods:{
   itemClick(index){
      this.currentIndex = index;
      // 将参数传出去,用于titles与数据的绑定
      // this.$emit('tabClick',index)
    }
  }
};
</script>

<style  scoped>
.aside{
  display: flex; 
  flex-direction: column;
  height: 40px;
  line-height: 40px;
  width: 80px;
}
.aside-item{
  flex: 1; 
  text-align: center;
}
.active{
  color: var(--color-high-text);
}
</style>
