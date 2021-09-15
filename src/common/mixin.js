// 在这里做一个混入，可以在home和detail同时使用到
import {debouce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh:null,
    };
  },
  mounted () {
   this.newRefresh = debouce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () =>{
     this.newRefresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    // console.log('bubuubub')
  }
}

export const backTopMixin={
  data() {
    return {
    isShowBackTop: false,
    };
  }, 
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
 
}