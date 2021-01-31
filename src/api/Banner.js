import request from '../utils/request'


// 封装添加轮播图
export function addBanner (params){
    return request.post('/banner/add',params)
}