








import React, { useState } from 'react'
import { Layout} from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
   
  } from '@ant-design/icons';
const { Header} = Layout;


 function MainHeader() {
     const [collapsed,getCollapsed]=useState(false)
const toggle=()=>{
    getCollapsed(!collapsed)
}
    return (
        <Header className="site-layout-background" style={{ padding: "0 16px" }}>
            {/* 这样的点击仅仅只能切换图标箭头向左向右，还不能满足左边菜单栏的显示与隐藏 */}
        {
        collapsed ? 
        <MenuUnfoldOutlined style={{fontSize:"20px"}} className='trigger'onClick={toggle}/>:
        <MenuFoldOutlined style={{fontSize:"20px"}} className='trigger'onClick={toggle}/>
        
    }
      </Header>
    )
}
export default MainHeader