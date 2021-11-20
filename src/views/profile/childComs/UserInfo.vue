<!-- 登录的头像信息 -->
<template>
  <div id="user-info">
  <div class="left">
    <img src="~assets/images/profile/userimg.png" alt="">
  </div>
  <div class="middle">
    <p class="middle-text">登录/注册</p>
    <p>绑定手机号</p>
  </div>
  <div class="right">
      <img src="~assets/images/profile/userfix.png" alt="">
  </div>
  </div>
</template>

<script>
export default {
 name:"user-info"
}
</script>

<style  scoped>
#user-info{
   background-color: var(--color-tint);
   padding: 15px;
   margin-top: -5px;
   display: flex;
}
.middle{
  color: #fff;
  flex: 1;
  margin-left: 8px;
  margin-top:8px;
}
.left img{
  width:64px;
  height: 64px;
}
.right{
margin-top: 15px;
}
</style>
