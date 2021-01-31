import React from 'react'
import { Menu } from 'antd';
import menus from '../../routers/menus'
import { withRouter} from 'react-router-dom';
const { SubMenu } = Menu;//二级菜单标识


const SideMenu=withRouter((props)=>{//withRouter 包裹是为了获取编程式导航的对象


//     withRouter的作用和一个简单应用
// 作用：把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
 
// 默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面
// 然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

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

    const  changePages=({key})=>{
        console.log(props);
        console.log(props.history);//想要history有值就需要给App里面的渲染组件外套一个路由<Router>，但是Router包裹在了app上就不要再在内容耶路由上包裹了，会造成内容页路由没反应
        props.history.push(key)
        
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
  
})

export default SideMenu


