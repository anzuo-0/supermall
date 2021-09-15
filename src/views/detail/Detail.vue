<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-params-info
        :param-info="paramInfo"
        ref="params"
      ></detail-params-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <detail-recommend
        :recommend-list="recommendList"
        ref="recommend"
      ></detail-recommend>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top
      @click.native="backTop"
      v-show="isShowBackTop"
      class="backtop"
    ></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
// 获取的数据
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import Scroll from "components/common/scroll/Scroll";
import DetailRecommend from "./childComps/DetailRecommend.vue";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { debouce } from "common/utils.js";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "components/content/backtop/BackTop";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailRecommend,
    DetailBottomBar,
    BackTop,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 拿到对应的iid，保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求的数据
    getDetail(this.iid).then((res) => {
      // 获取轮播图的图片
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商店的信息
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 商品的参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 商品的评价
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 拿到推荐的数据
    getRecommend().then((res) => {
      this.recommendList = res.data.list;
    });

    // 第二次获取，值不对，图片没有计算在类
    // this.$nextTick(() => {
    // 根据最新的数据，对应的dom被渲染出来，但是图片还没有被加载出来
    // offsetTop的值不对一般都是因为图片
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
    // });

    // 第一次获取，this.$refs.params.$el没有渲染
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);

    // 做防抖
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    }, 200);
  },
  destroyed() {
    // 因为detail不在keep-alive里面所以不能使用deactived
    this.$bus.$off("itemImgLoad", this.itemImgListener);
    // console.log("destroyed");
  },
  methods: {
    ...mapActions(['addCart']),
    // 监听scroll事件
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y;
      // 判断区间，在哪个就对应的显示哪个
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        // 当currentIndex与i不一致的时候判断
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          // 因为最后一个值无法进行比较所以做了两个情况，除了这种做法还可以我们手动给最后加一个大的数字
          this.currentIndex = i;
        }
      }
      // 回到顶部

      this.isShowBackTop = -position.y > 1000;
    },
    // 监听图片的加载完成
    detailImageLoad() {
      this.newRefresh();
      this.getThemeTopY();
      // 在这里试,效果可以出来，但是调用的太频繁了，所以使用防抖
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车
      // this.$store.cartList.push(product),虽然可以这样做但是不太好，要通过mutation
      // this.$store.commit('addCart',product),虽然可以使用mutatian,但是经过action更好
      // this.$store.dispatch("addCart", product).then((res) => console.log(res));
      // dispatch可以返回promise，所以在action里面new promise，在这里可以接收到
      // 可以将action映射到这
      this.addCart(product).then((res) => 
      this.$toast.show(res,3000));
    },
  },
  mounted() {
    // console.log("mounted");
    // 在这里有的值取不到
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
  // updated() {
  // 这里也不行
  // this.themeTopYs.push(0);
  // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  // console.log(this.themeTopYs);
  // },
};
</script>

<style  scoped>
/* 这个适合让底下的tabbar消失 */
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.backtop {
  margin-bottom: 5px;
}
</style>
