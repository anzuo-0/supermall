// home页请求的数据

import axios from './axios'

export const banner = 'banner'
export const recommend = 'recommend'

export function getHomeMultidata() {
  return axios({
    url:'/home/multidata'
  })
  
}
export function getHomeGoods(type,page) {
  return axios({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
  
}
