<!-- 登录界面 -->
<template>
  <div id="profile">
    <!-- 头部标题 -->
    <nav-bar class="nav-bar"><div slot="center">个人信息</div></nav-bar>
    <!-- 登录界面，头像，编辑信息等 -->
    <user-info />
    <!-- 余额 -->
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <!-- 其他东西 -->
    <div class="message">
      <div>我的消息</div>
      <div>积分商城</div>
      <div>会员卡</div>
    </div>
    <div class="download">
      <div>下载购物APP</div>
      <div>关于</div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import UserInfo from "./childComs/UserInfo.vue";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,

  }
};
</script>

<style  scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}
.message{
  border-top:8px solid rgba(100, 100, 100, .1);
  border-bottom:8px solid rgba(100, 100, 100, .1);
}
.message div{
   margin-left: 8px;
   font-size: 16px;
   line-height: 40px;
   border-bottom: 2px solid rgba(100, 100, 100, .1);
}
.message div:last-child{
  border-bottom:0;
}
.download div{
  margin-left: 8px;
   font-size: 16px;
   line-height: 40px;
   border-bottom: 2px solid rgba(100, 100, 100, .1);
}
.download div:last-child{
   border-bottom:0;
}
</style>
