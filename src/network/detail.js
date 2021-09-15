import axios from "./axios";

export function getDetail(iid) {
  return axios({
    url: '/detail',
    params: {
      iid
    },
  })
}
export function getRecommend() {
  return axios({
    url: '/recommend',
  })
}
// 将数据整合在一起，封装在一个类里面，面向一个对象开发
// 这是商品的信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 这是商店的信息
export class Shop{
  constructor(shopInfo){
    this.name = shopInfo.name;
    this.score =shopInfo.score;
    this.logo = shopInfo.shopLogo;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 商品的参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}