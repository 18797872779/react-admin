import { createStore, applyMiddleware, compose } from 'redux'
import {combineReducers} from 'redux-immutable'//将分模块的文件与immutable关联起来来管理数据
import thunk from 'redux-thunk'//引入thunk中间件",

import commonReducer from './modules/common'
// 将多个reducer合并为一个reducer，提供给store，分模块使用",		
const reducer= combineReducers({	//分模块的模块文件",	
    common:commonReducer

})
// 判断浏览器是否安装了redux devtools插件",
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
applyMiddleware(thunk) //调用中间件",
));
export default store;

