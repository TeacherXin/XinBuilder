import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as myComponent from './component'
import { message } from 'antd'
import subscribeHook from './component/subscribe'
import axios from 'axios'
import Store from './store'
import _ from 'lodash'

var getMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (getMobile.Android() || getMobile.BlackBerry() || getMobile.iOS() || getMobile.Opera() || getMobile.Windows());
  }
};

export default function MetaRender() {
  const state = useLocation().state;
  const [update,setUpdate] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [isMobile, setIsMobile] = useState(false)
  let attributeMap = _.cloneDeep(Store.getState().attributeMap);

  useEffect(() => {
    const pageId = state?.pageId || window.location.hash.replace('#/metaRender?pageId=','')
    if(pageId){
      axios.post(`http://${window.location.hostname}:80/pageJson/findPageByID`,{
        pageId
      })
      .then(res => {
        Store.dispatch({type:'change',attributeMap:res.data.data.pageJson})
        setIsMobile(res.data.data.isMobile);
        if(res.data.data.isMobile && !getMobile.any()) {
          message.warning('移动页面，请在手机端打开')
        }
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

  useEffect(() => {
  }, [])

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
    <div style={isMobile ? {transform: 'scale(1.5)', position:'relative', left: '-650px'} : {}}>
      {contextHolder}
      {(Object.keys(attributeMap)).map(item => {
        return getComponent(attributeMap[item])
      })}
    </div>
  )
}
