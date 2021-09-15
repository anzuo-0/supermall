<!--  -->
<template>
  <div class="tab-control">
    <!-- 当只是文字不一样的时候，没有必要使用插槽 -->
    <div class ="tab-control-item" v-for = "(item,index) in titles" :key="item.id"
    :class="{active : index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
   
  </div>
  
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex : 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      // 将参数传出去,用于titles与数据的绑定
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style  scoped>
.tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-high-text);
}
</style>
