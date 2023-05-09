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
  },[])

  subscribeHook(() => {
    setUpdate({})
  })

  return (
    <div>
      {contextHolder}
      {Object.keys(attributeMap).map((item,index) => {
        const Com = myComponent[attributeMap[item].comType];
        return <div key={index} id={item} style={attributeMap[item].style}>
          <Com
            renderFlag={true}
            onClick={()=>{}}
            {...attributeMap[item]}
            />
        </div>
      })}
    </div>
  )
}
