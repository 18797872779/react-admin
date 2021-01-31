import {Map} from 'immutable'
import *as type from '../actionType'

const reducer=(state=Map({
        collapsed:false,
        color:'#fff'
}),action)=>{
    switch (action.type) {
        case type.CHANGE_COLLASPED:
            // 在仓库这个地方来做数据处理
        return state.set('collapsed',!state.get('collapsed'))
    case type.CHANGE_COLOR:
            // 在仓库这个地方来做数据处理
        return state.set('color',action.payload)
        default:

            return state;
    }
}

export default reducer
