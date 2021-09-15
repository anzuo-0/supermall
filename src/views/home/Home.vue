<!--  -->
<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <!-- tabControl复制一份放在这 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content-scroll"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        ref="hSwiper"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend :recommends="recommends" />
      <feature></feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- <goods-list :goods="goods['pop'].list"></goods-list> -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部 -->
    <!-- 在这里监听back-top组件 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComs/HomeSwiper.vue";
import Recommend from "./childComs/Recommend.vue";
import Feature from "./childComs/Feature.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { itemListenerMixin,backTopMixin } from "common/mixin.js";

import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop";

export default {
  components: {
    HomeSwiper,
    Recommend,
    Feature,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      // 存储回收的数据
      // result : null
      banners: [],
      recommends: [],
      // 请求多个数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // 判断显示还是隐藏，false为隐藏
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
    // 让home离开后再回到原来的位置
    // destroyed () {
    //   console.log('destroyed')
    //   return this.destroyed;
    // },
  },
  // 钩子函数
  // 这两个用于记录离开和进来时的位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 在离开时取消监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    this.getMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //  设置监听item图片的加载完成
    // 在created里面加载refs时，有时会加载不到，所以应该放在mouted里面
    // this.$bus.$on('itemImageLoad',()=>{
    //   console.log('-------');
    //   this.$refs.scroll.refresh()
    // })
  },
  mounted() {
    // this.$bus.$on('itemImageLoad',()=>{
    //   console.log('-------');
    //   this.$refs.scroll.refresh()
    // })
    // 在调用refresh时，太频繁了，所以设置一个防抖函数debounce，封装在utils.js文件中
    // 防抖函数就是让操作频繁的操作等一段时间一起操作
    // let newrefresh = debounce(this.$refs.scroll.refresh, 200);
    // this.itemImgListener = () =>{
    //   newrefresh()
    // }
    // this.$bus.$on("itemImageLoad", () => { this.itemImgListener});
    //  首先获取到tab-control的offsetTop
    // 这样直接取this.$refs.tabControl，是取不到的,因为组件里面没有offsetTop
    // 所以我们要先获取到组件里面的元素，利用$el,所有的组件都有这个
    // this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
    // 但是这种获取的也不准确，因为有时候图片没有加载出来，高度就有问题，所有就要设置图片加载的监听
    // 发现轮播图图片的加载时最慢的，所以设置对轮播图中图片的监听
  },
  // activated: function () {
  //   this.$refs.hSwiper.startTimer();
  // },
  // deactivated: function () {
  //   this.$refs.hSwiper.stopTimer();
  // },
  methods: {
    //事件监听相关
    // 获取tab的offsetTop，为了让它不进行多次调用，使用isLoad来记录 ，与debounce的区别
    swiperImageLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 设置上拉加载更多
    loadMore() {
      // console.log("上拉加载更多");
      // 进行这个方法时，会获取到页码
      this.getHomeGoods(this.currentType);
    },

    contentScroll(position) {
      // 1、回到顶部按钮的显示和隐藏
      this.isShowBackTop = -position.y > 1000;
      // 2、设置tabControl的吸顶
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    // 回到顶部
    // backClick() {
    //   // 找到scroll组件里面的scroll属性里面的scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让他们两个的点击后保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 网络请求相关方法
    getMultiData() {
      getHomeMultidata().then((res) => {
        /*轮播图数据*/
        this.banners = res.data.banner.list;
        /*推荐数据*/
        this.recommends = res.data.recommend.list;
      });
    },
    // 同时处理多组数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 将获取到的数据都放到一个数组里面
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 当数据加载完之后，必须调用一个这个方法，才能进行下一次的加载
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style  scoped>
/* scoped是作用域，如果没有加这个，说明样式在别的地方也会起效果 */
#home {
  /* position: relative; */
  padding-top: 44px;
  /* 视口的高度 */
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  /*否则center宽度不撑满整个屏幕*/
  left: 0;
  right: 0;
  top: 0;

  z-index: 9;
}
.content-scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 这个在设置完bettee-sroll后就已经失效了，所以我们要重新设置tab-control的吸顶效果，利用offsetTop
 */
.tab-control {
  position: relative;
  /* 这个属性一般移动端能使用 */
  z-index: 9;
}

/* .content-scroll { */
/* height:calc(100%-93px) margin-top:44px */
/* position: relative; */
/* top:44px;
  bottom: 49px;
  left: 0;
  right: 0; */
/* } */
</style>
