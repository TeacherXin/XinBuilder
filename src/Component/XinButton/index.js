import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd';
import './index.css'
import _ from 'lodash'

export default function XinButton(props) {

  const {attributeValue,actionJs,styleCss,buttonType,size,disabled,danger,ghost,visible} = props
  // 按钮组件的样式
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 当styleCss变化时，更新组件的style
   * @level 3
   */
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style;
    try {
      style = JSON.parse(styleStr)
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
   * 按钮的点击事件
   * @param {*} e 事件对象
   * @level 3
   */
  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  return (
    <div style={{display: visible ? 'none':'block'}} id='componentButton'>
      {contextHolder}
      <Button
        type={buttonType || 'primary'}
        onClick={onClick}
        size={size || 'default'}
        disabled={disabled}
        danger={danger}
        ghost={ghost}
        style={style}
      >
        {attributeValue || '默认按钮'}
      </Button>
    </div>
  )
}
