import React,{lazy} from 'react';

import {
  
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    SwapRightOutlined
  } from '@ant-design/icons';

const menus=[

    {
        path:'/home',
        title:'系统首页',
        icon:<UserOutlined/>,
        component:lazy(()=>import('../views/Home/Index'))
    },
    {
        path:'/bannermannage',
        title:'轮播图管理',
        icon:<VideoCameraOutlined/>,
        redirect:'/bannermannage/list',
        children:[
            {
                path:'/bannermannage/list',
                title:'轮播图列表',
                icon:<UploadOutlined/>,
        component:lazy(()=>import('../views/banner/Index'))
            },
            {
                path:'/bannermannage/add',
                title:'添加轮播图',
                icon:<SwapRightOutlined />,
        component:lazy(()=>import('../views/banner/AddBanner')),
        meta:{
            hidden:true
        }
            }
        ]
        
    },
    {
        path:'/navmannage',
        title:'快捷导航管理',
        icon:<VideoCameraOutlined/>,
        redirect:'/navmannage/list',
        children:[
            {
                path:'/navmannage/list',
                title:'导航列表',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/navigator/List'))
            },
            {
                path:'/navmannage/type',
                title:'导航分类',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/navigator/Category'))
            },  {
                path:'/navmannage/hlist',
                title:'首页导航',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/navigator/HomeList'))
            }, 
        ]
        
    },
    {
        path:'/secendsellmannage',
        title:'秒杀管理',
        icon:<VideoCameraOutlined/>,
        redirect:'/secendsellmannage/list',
        children:[
            {
                path:'/secendsellmannage/list',
                title:'首页秒杀列表',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/seckill/List'))

            }
           
        ]
        
    },
    {
        path:'/usermannage',
        title:'用户管理',
        icon:<VideoCameraOutlined/>,
        redirect:'/usermannage/list',
        children:[
            {
                path:'/usermannage/list',
                title:'用户列表',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/userManager/List'))

            },
            {
                path:'/usermannage/add',
                title:'用户添加',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/userManager/Add'))

            }, {
                path:'/navmannage/setting',
                title:'设置中心',
                icon:<UploadOutlined/>,
                component:lazy(()=>import('../views/userManager/Setting')),
                meta:{
                    hidden:true
                }
            }
           
        ]
        
    }
]

export default  menus