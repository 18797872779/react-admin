import request from '../utils/request'


// 封装添加轮播图
export function addBanner (params){
    return request.post('/banner/add',params)
}


//封装获取轮播图数据
export function getBanner (params){
    return request.get('/banner',{ params })
}

// 封装删除轮播图数据

export function deleteBanner (params){
    return request.get('/banner/delete',{ params })
}

// 封装批量删除轮播图数据

export function deleteAllBanner (params){
    return request.post('/banner/deleteAll', params )
}
