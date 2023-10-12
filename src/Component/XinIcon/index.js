import React, { useState,useEffect } from 'react'
import { message } from 'antd'
export default function XinIcon(props) {

  const {styleCss,iconType,twoToneColor,rotate,visible,actionJs } = props
  const [messageApi, contextHolder] = message.useMessage();
  // Icon组件的样式
  const [style,setStyle] = useState({})

  /**
   * 当配置好样式后，更新Icon组件的style
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
   * Icon组件的点击事件
   * @param {*} e 事件对象
   */
  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  let name = iconType
  let Ctor = require('@ant-design/icons')[name] ? require('@ant-design/icons')[name] : require('@ant-design/icons')['SmileOutlined'];

  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      {
        <Ctor onClick={onClick} twoToneColor={twoToneColor} style={style} rotate={rotate} />
      }
    </div>
  )
}
