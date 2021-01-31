import React from 'react';
import { Menu } from 'antd';
import menus from '../../routers/menus'


class HeaderNav extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                {
                    menus.map(item => {
                        if (item.children) {
                          return  item.children.map(val=>{
                              console.log(val.path);
                            return <Menu.Item key="val.path" icon={val.icon}>
                                {val.title}
                            </Menu.Item>
                            })
                        } else {
                            return <Menu.Item key="item.path" icon={item.icon}>
                                {item.title}
                            </Menu.Item>
                        }
                    })
                }



            </Menu>
        );
    }
}
export default HeaderNav