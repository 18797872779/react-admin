import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import menus from '../../routers/menus'
import { withRouter, useLocation, useHistory } from 'react-router-dom';
const { SubMenu } = Menu;//二级菜单标识


// 放在组件外，先得到 哪些有二级菜单
const rootSubmenuKeys = [];//这个数组里面放的是需要只显示一个菜单功能的一级菜单的key值
menus.forEach(item => {//循环路由含有子导航的项并push进去
   item.children&&rootSubmenuKeys.push(item.path)
})
console.log(rootSubmenuKeys);

const SideMenu = withRouter((props) => {//withRouter 包裹是为了获取编程式导航的对象
    //     withRouter的作用和一个简单应用
    // 作用：把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上

    // 默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面
    // 然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props


    const { pathname } = useLocation();
    console.log(pathname);
    const openpath = "/" + pathname.split("/")[1]
    // 记录展开的菜单项

    // 用useState来记录数据，set函数来改变数据参数是改变的值，这里面的括号里面是设置初始值,有了这个初始值就是可以将左边菜单高亮刷新有效
    const [openKeys, setOpenKeys] = useState([openpath])
    const [selectedKeys, setSelectedKeys] = useState()

    const onOpenChange = keys => {//keys[] 包含点击后与点击前的导航地址
        console.log(keys);//["/bannermannage", "/navmannage"]
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        console.log(latestOpenKey);//后一个一级导航菜单地址即当前一级菜单地址 "/navmannage"
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      
    };

    const history=useHistory()

    const renderMenu = (menus) => {
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
                                item.meta && item.meta.hidden ? null : <Menu.Item key={item.path} icon={item.icon}>{item.title}</Menu.Item>
                            )
                        }
                    })
                }
            </>
        )
    }

    const changePages = ({ key }) => {
        // console.log(props);
        // console.log(props.history);//想要history有值就需要给App里面的渲染组件外套一个路由<Router>，但是Router包裹在了app上就不要再在内容耶路由上包裹了，会造成内容页路由没反应
        // props.history.push(key)
        history.push(key)

    }



    // 通过hook里面的userLocation获取到pathname，获得左边菜单栏的状态
    // defaultSelectedKeys：控制具体高亮的导航
    // defaultOpenKeys：控制打开的导航项



    // 还有另外一个情况，就是不传递第二个参数，也就是useEffect只接收了第一个函数参数，代表不监听任何参数变化。每次渲染DOM之后，都会执行useEffect中的函数。
    // 就达到了重新渲染的效果
    useEffect(() => {
        setSelectedKeys(pathname)
    })
    return (
        <Menu
            defaultSelectedKeys={[pathname]}//{["usermanager/list"]}
            defaultOpenKeys={[openpath]}//{["usermanager"]}：里面接数组
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onClick={changePages}
        >
            {/* 方便做多级菜单，递归的思想 */}
            {renderMenu(menus)}
        </Menu>
    )

})

export default SideMenu


