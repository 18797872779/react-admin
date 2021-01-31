
// 单独渲染路由数据的组件
// 运用了递归的知识

import React, { Suspense } from 'react'
import {  Route, Switch} from 'react-router-dom'
import menus from './menus'
import {Spin} from 'antd'

import RedirectRouter from './RedirectRouter'
export default function layoutComRoute() {
    const renderRouter=(menus)=>{
        return menus.map(item=>{
          if (item.children) {
           return renderRouter(item.children)
          }else{
           return <Route key={item.path} path={item.path} exact component={item.component}/>
          }
        })
      }
    return (
        
        <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
              <Switch>
                {
                  renderRouter(menus)
                }
                <RedirectRouter/>
              </Switch>
            </Suspense>
    )
}

