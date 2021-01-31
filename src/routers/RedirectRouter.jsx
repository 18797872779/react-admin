import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import menus from './menus'

const redirectMenu=menus.filter(item=>item.redirect)
console.log(redirectMenu);
function RedirectRouter() {
    return (
       <Switch>
           {
               redirectMenu.map(item=>{
                 return  <Redirect key={item.path} path={item.path} exact to={item.redirect}/>
               })
           }
       </Switch>
    )
}
export default RedirectRouter