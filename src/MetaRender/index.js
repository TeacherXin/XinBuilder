import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as myComponent from '../Component'
import { message } from 'antd'
import subscribeHook from '../DefineHook/subscribe'
import axios from 'axios'
import Store from '../Store'
import _ from 'lodash'

export default function MetaRender() {
  const state = useLocation().state;
  const [update,setUpdate] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  let attributeMap = _.cloneDeep(Store.getState().attributeMap);

  useEffect(() => {
    if(state?.pageId){
      axios.post(`http://${window.location.hostname}:3003/pageJson/findPageByID`,{
        pageId: state.pageId
      })
      .then(res => {
        Store.dispatch({type:'change',attributeMap:res.data.data.pageJson})
      })
      .catch(err => {
        messageApi.open({
          type: 'error',
          content: '获取页面详情失败',
        });
      })
    }else{
      messageApi.open({
        type: 'error',
        content: '获取页面详情失败',
      });
    }
  },[state])

  subscribeHook(() => {
    setUpdate({})
  })

  const getComponent = (item) => {
    let Com = myComponent[item.comType];
    if(!Com && item.groupType === 'defineCom'){
      let fun = new Function('return ' + item.component)
      Com = fun();
    }
    if(!Com){
      return <></>
    }
    return <div id={item.comId} key={item.comId} style={item.style}>
      {<Com
        {...window.findNodeByComId(item.comId,attributeMap)}
        >
          {
            Object.keys(item.childList || {}).map(_item => {
              return getComponent(item.childList[_item])
            })
          }
        </Com>
      }
    </div>
  }

  return (
    <div>
      {contextHolder}
      {(Object.keys(attributeMap)).map(item => {
        return getComponent(attributeMap[item])
      })}
    </div>
  )
}
