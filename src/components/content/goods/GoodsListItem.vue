<!--  -->
<template>
  <div class="goods" @click="itemClick">
    <img :src="showImage" alt="" @Load="imgLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imgLoad() {
      // 在这向事件总线发射this.$bus.$emit.
      // 在首页里面监听
      // 这个bus是没有东西，需要在原型里面添加实例，所以去到main.js
      this.$bus.$emit("itemImageLoad");
    },
    // 当详情页里面的图片加载完了会让home做一个刷新，应该将home和detail做一个区分
    // 可以使用路由，也可以使用现在的方法，mixin
    // if(this.$route.path.indexOf('/home')){
    // this.$bus.$emit("homeitemImageLoad");
    // }else if (this.$route.path.indexOf('/detail')){
    //       this.$bus.$emit("deatailitemImageLoad");
    // }
    
    itemClick() {
      // 设置详情页的跳转，保存传入的iid
      console.log(this.goodsItem.iid);
      this.$router.push("/detail/" + this.goodsItem.iid);
      // 根据iid请求数据
    },
  },
};
</script>

<style  scoped>
.goods {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}
.goods img {
  width: 100%;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>
