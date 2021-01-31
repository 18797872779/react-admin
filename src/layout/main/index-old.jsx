import React, { Suspense,lazy } from 'react'
import svg from "../../img/logo.svg"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { Layout,Spin} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
 
} from '@ant-design/icons';
import SideMenu from './SideMenu'

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
              <img src={svg} alt="" title="JD_ADMIN_PRO"/>
              {
                 this.state.collapsed ? null:<span>JD_ADMIN_PRO</span>
              }
          </div>
         <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
           <Router>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position:"relative"//需要在父元素上面设置相对定位才能让子元素的绝对定位生效
            }}
          >
            <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
             <Switch>
              <Route path="/" exact component={lazy(()=>import("../../views/Home/Index"))}/>
         </Switch>
            </Suspense>
          </Content> 
           </Router>
        </Layout>
      </Layout>
    );
  }
}

export default Index