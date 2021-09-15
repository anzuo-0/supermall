<!-- 设置当点击加入购物车或者去计算时跳出来的弹窗 -->
<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  props: {
    // isShow:{
    //   type:Boolean,
    //   default:false
    // },
    // message:{
    //   type:String,
    //   default:""
    // }
  },
  methods: {
    show(message, duration) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style  scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: aliceblue;
  background-color: rgb(0, 0, 0, 0.8);
  padding: 8px 10px;
  z-index: 999;
  border-radius: 5px;
}
</style>
