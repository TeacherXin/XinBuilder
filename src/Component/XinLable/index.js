import React, { useState,useEffect } from 'react'
import { message } from 'antd'
import './index.css'

export default function Label(props) {

  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const {attributeValue,className,actionJs,styleCss,visible} = props

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {};
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {};
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  return (
    <div style={{display: visible ? 'none':'block'}} className='label'>
      {contextHolder}
      <span onClick={onClick} style={{...style,display:'inline-block'}} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
