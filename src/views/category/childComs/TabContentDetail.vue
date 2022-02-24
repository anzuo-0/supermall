<!--  -->
<template>
  <div class="cate-detail">
     <div class="detail-item" v-for = "item in list" :key = item.id>
     </div>
  </div> 
</template>

<script>
export default {
  name:'TabContentDetail',
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>

</style>
