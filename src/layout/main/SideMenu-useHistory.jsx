import React from 'react'
import { Menu } from 'antd';
import menus from '../../routers/menus'
import { useHistory} from 'react-router';
const { SubMenu } = Menu;//二级菜单标识


 function SideMenu() {
    let history=useHistory()
function  changePages(props){
        console.log(props);
        console.log(history);//想要history有值就需要给App里面的渲染组件外套一个路由<Router>，但是Router包裹在了app上就不要再在内容耶路由上包裹了，会造成内容页路由没反应
        history.push(props.key)
        
    }

   const renderMenu=(menus)=>{
        return (
            <>
                {
                    menus.map(item => {
                        if (item.children) {//有多级菜单
                            return (
                                <SubMenu key={item.path} icon={item.icon} title={item.title}>
                                    {renderMenu(item.children)}
                                </SubMenu>
                            )

                        }
                        else {//只有一级菜单
                            return (
                                //通过下面的三目运算，选择有些子路由不需要在左边菜单栏显示可以通过地址显示
                                item.meta&&item.meta.hidden? null:<Menu.Item key={item.path} icon={item.icon}>{item.title}</Menu.Item>
                            )
                        }
                    })
                }
            </>
        )
    }

        return(
            <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          onClick={changePages}
        >
            {/* 方便做多级菜单，递归的思想 */}
            {renderMenu(menus)}
        </Menu>
        )
  
}

export default SideMenu

// import { Menu, Button } from 'antd';
// import {
//   AppstoreOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
// } from '@ant-design/icons';

// const { SubMenu } = Menu;

// class SideMenu extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggleCollapsed = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   render() {
//     return (
//       <div>

//         <Menu
//           defaultSelectedKeys={['1']}
//           defaultOpenKeys={['sub1']}
//           mode="inline"
//           theme="dark"
//           inlineCollapsed={this.state.collapsed}
//         >
//           <Menu.Item key="/" icon={<PieChartOutlined />}>
//            系统首页
//           </Menu.Item>
//           <SubMenu key="/one" icon={<MailOutlined />} title="轮播图管理">
//             <Menu.Item key="/one/one-one">轮播图列表</Menu.Item>
//           </SubMenu>
//           <SubMenu key="sub2" icon={<AppstoreOutlined />} title="快捷导航管理">
//             <Menu.Item key="9">导航列表</Menu.Item>
//             <Menu.Item key="10">导航分类</Menu.Item>
//             <Menu.Item key="10">首页导航</Menu.Item>
//           </SubMenu>
//           <SubMenu key="sub3" icon={<AppstoreOutlined />} title="秒杀管理">
//             <Menu.Item key="10">首页秒杀列表</Menu.Item>
//           </SubMenu>
//         </Menu>
//       </div>
//     );
//   }
// }

// export default SideMenu