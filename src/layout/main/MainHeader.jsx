import React from 'react'
import { Layout} from 'antd';
import { connect } from 'react-redux'


import Breadcrumb from './Breadcrumb'
import * as type from '../../store/actionType';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,

} from '@ant-design/icons';
const { Header } = Layout;


function MainHeader({ collapsed, getCollapsed,color,handleChange}) {

    // 统一将获取collapsed的数据都靠immutable管理
    //  const [collapsed,getCollapsed]=useState(false)
    const toggle = () => {
        getCollapsed()

    }
    return (

            <Header className="site-layout-background" style={{ padding: "0 16px", display:'flex',alignItems:"center",backgroundColor:color }}>
                {/* 这样的点击仅仅只能切换图标箭头向左向右，还不能满足左边菜单栏的显示与隐藏 */}
              <div style={{width:'50px' ,marginTop:'5px'}}>
              {
                    collapsed ?
                        <MenuUnfoldOutlined style={{ fontSize: "20px" }} className='trigger' onClick={toggle} /> :
                        <MenuFoldOutlined style={{ fontSize: "20px" }} className='trigger' onClick={toggle} />

                }
              </div>
               <div style={{flex:1}}>
               <Breadcrumb/>
               </div>
               <div style={{flex:1}}>
                   <input type="color" onChange={(ev)=>{
                       console.log(ev);
                       handleChange(ev.target.value)
                   }}  name="" id=""/>
               </div>
            </Header>
    )
}
export default connect((state) => ({
    collapsed: state.getIn(['common', 'collapsed']),//获取到仓库里面的处理好的数据
    color: state.getIn(['common', 'color'])
})
    , (dispatch) => ({
        getCollapsed() {
            dispatch({
                type: type.CHANGE_COLLASPED
            })
        },
        handleChange(data){
            dispatch({
                type:type.CHANGE_COLOR,
                payload:data
            })
        }
    }))(MainHeader)






