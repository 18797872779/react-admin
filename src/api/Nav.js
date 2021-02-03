// 导航的数据请求
import request from '../utils/request'


// 封装请求导航类别
export function getCategory(params){
    return request.get('/nav/navcategory',{ params })
}

// 封装导航列表数据
export function getNavlist(params){
    return request.get('/nav/navlist',{ params })
}