// 封装请求的地址和拦截器


import axios from 'axios'
const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? '' :'http://www.daxun.com/api'
})


// 设置拦截器

export default request