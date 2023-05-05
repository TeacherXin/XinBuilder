import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash'
import '../Util/index.js'

const initialState  = { attributeMap: {} }

function attributeMapReducer(state = initialState, action) {
  if (action.type === 'change') {

    if(action.comId){
      let attributeMap = _.cloneDeep(state.attributeMap);
      attributeMap[action.comId] = action.attributeMap;
      window.xinCtx = _.cloneDeep(attributeMap);
      window.proxyAttributeMap();
      return  {
        ...state,
        attributeMap: attributeMap
      };
    }

    window.xinCtx = _.cloneDeep(action.attributeMap);
    window.proxyAttributeMap();
    return  {
      ...state,
      attributeMap: _.cloneDeep(action.attributeMap)
    };
  }
  // 返回原来的 state 不变
  return state
}

export default configureStore({ reducer: attributeMapReducer });