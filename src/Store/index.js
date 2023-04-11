import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState  = { attributeMap: {} }

function attributeMapReducer(state = initialState, action) {
  if (action.type === 'change') {
    // 如果是，复制 `state`
    return  {
      ...state,
      attributeMap: _.cloneDeep(action.attributeMap)
    };
  }
  // 返回原来的 state 不变
  return state
}

export default configureStore({ reducer: attributeMapReducer });

// console.log(store.getState())

// store.dispatch({ type: 'counter/increment' })

// console.log(store.getState())

// const selectCounterValue = state => state.value

// const currentValue = selectCounterValue(store.getState())
// console.log(currentValue)