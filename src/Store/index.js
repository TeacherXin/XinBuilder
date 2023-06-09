import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash'
import '../Util/index.js'

const initialState  = { attributeMap: {} }

const setValue = (attributeMap,id,value) => {
  for(let propName in attributeMap){
    if(propName === id){
      return attributeMap[propName] = value;
    }
    if(attributeMap[propName].childList){
      for(let _propName in attributeMap[propName].childList){
        if(_propName === id){
          attributeMap[propName].childList[_propName] = value
        }
      }
    }
  }
}

function attributeMapReducer(state = initialState, action) {
  if (action.type === 'change') {

    if(action.comId){
      let attributeMap = _.cloneDeep(state.attributeMap);
      setValue(attributeMap,action.comId,action.attributeMap)
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