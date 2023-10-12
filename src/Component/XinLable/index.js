import React, { useState,useEffect } from 'react'
import { message } from 'antd'
import './index.css'

export default function Label(props) {

  //label组件的样式
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const {attributeValue,className,actionJs,styleCss,visible} = props

  /**
   * 当样式配置好后，更新label组件的style值
   * @level 3
   */
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

  /**
   * lable组件的点击事件
   * @param {*} e 事件对象
   * @level 3
   */
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
