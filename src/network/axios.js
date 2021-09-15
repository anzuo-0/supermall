import originAxios from 'axios'


export default function axios(option) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: "http://152.136.185.210:7878/api/m5",
      timeout: 5000
    });

    
    //拦截请求，如果获取某个请求需要携带一些额外数据
    instance.interceptors.request.use(config => {
      return config
    
		}, err => {
			// console.log('来到了request拦截failure中');
			return err
		})

		instance.interceptors.response.use(response => {
			// console.log('来到了response拦截success中');
			return response.data
		}, err => {
			console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}