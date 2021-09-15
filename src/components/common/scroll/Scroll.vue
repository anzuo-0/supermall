<!-- 封装better-scroll -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

// 这个插件是用来解决鼠标无法滚动的问题
// 因为后面直接加载图片，加上版本问题我就卸载了这个插件
// import ObserveDom from "@better-scroll/observe-dom";

// BScroll.use(ObserveDom);

// 解决鼠标无法滚动还有一种方法是利用refresh，首先在GoodsItem里面给图片添加监听函数 @load

export default {
  props: {
    // 定义为一个属性后，用到的时候才会用
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      // 让它可以直接用滚轮滑动
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // 通过自定义事件将它传出去,这样就会在它当时的页面惊醒调用
        this.$emit("scroll", position);
      });
    }

    // 监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多')
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 直接在这里封装一个方法
    // 回到哪个位置
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 完成加载后进行下一次的加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 记录y的值
    getScrollY() {
      return this.scroll.y ?this.scroll.y:0;
    },
    // 设置图片的加载
    refresh() {
    this.scroll.refresh()
    //在有值的情况下调用refresh
    this.scroll && this.scroll.refresh();
    }
  },
};
</script>

<style  scoped>
</style>
