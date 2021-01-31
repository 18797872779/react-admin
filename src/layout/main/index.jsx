import React from 'react'
import svg from "../../img/logo.svg"
import {connect} from 'react-redux'

import { Layout} from 'antd';

// import common from '../../store/modules/common'
import SideMenu from './SideMenu'
import LayoutComRoute from '../../routers/layoutComRoute'
import MainHeader from './MainHeader';
// import HeaderNav from '../../layout/main/HeaderNav'
const { Sider, Content } = Layout;
 // 现在需要在redux中获取被immutable管理的数据
  // 用connent装饰器
  @connect(state=>{
    return{
      collapsed:state.getIn(['common','collapsed'])//获取仓库处理好的数据
    }
  })

class Index extends React.Component {
  render() {
    const {collapsed}=this.props//取得的数据会自动存在props里面
    return (
      <Layout>
        {/* 为什么箭头点击了有反应但是菜单栏没有隐藏呢 */}
        {/* 因为在这边sider上面控制隐藏的属性collapsed无法获得已经切换的collapsed值，所以需要状态管理器存储collapsed值 */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
              <img src={svg} alt="" title="JD_ADMIN_PRO"/>
              {
                 collapsed ? null:<span>JD_ADMIN_PRO</span>
              }
          </div>
          <SideMenu/>
         
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header> */}
          <MainHeader/>
          <div className="headernav">
          {/* <HeaderNav/> */}
          </div>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position:"relative"//需要在父元素上面设置相对定位才能让子元素的绝对定位生效
            }}
          >
            {/* 单独将这个获取路由数据从而渲染的过程封装成一个组件 */}
           <LayoutComRoute/>
          </Content> 
        </Layout>
      </Layout>
    );
  }
}


export default Index