//面包屑
import { Link, withRouter, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import menus from '../../routers/menus'


const breadcrumbNameMap = {};
const reducerBread = (menus) => {
    menus.forEach(item => {
        if (item.children) {
            breadcrumbNameMap[item.path] = item.title
            reducerBread(item.children)
        } else {
            // 将路由地址与路由title以对象的形式遍历出来
            /* {路由地址1:title1
             路由地址2:title2
             路由地址3:title3
             路由地址4:title4}*/
            breadcrumbNameMap[item.path] = item.title
        }
    })
}
reducerBread(menus)
// console.log(breadcrumbNameMap);

const Bread = withRouter(props => {

    // console.log(useLocation(),props.location);
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter(i => i);
    console.log(pathSnippets);//["navmannage", "type"]把每一级路由地址都列出来
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        console.log(url);//secendsellmannage/list
        return (
            <Breadcrumb.Item key={url}>
                {/* 通过url再在上面的对象里面渲染出面包屑 */}
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        //这里渲染的是首页面包屑
        <Breadcrumb.Item key='/'>
            <Link to="/">首页</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    );
});

export default Bread