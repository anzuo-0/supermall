import axios from './axios';
export function getCategory() {
  return axios({
    url: '/category',
  })
}