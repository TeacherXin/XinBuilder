import React, { useState,useEffect } from 'react'
import { message } from 'antd';
import { Menu } from 'antd'

export default function XinMenu(props) {

  const {styleCss,mode,visible,actionJs,selectedKey } = props
  const [messageApi, contextHolder] = message.useMessage();
  const [style,setStyle] = useState({})

  
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"600px","minHeight":"30px","border":"1px solid blue","background":"none"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth: '600px',
        minHeight: '30px',
        border: '1px solid blue',
        background: 'none'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth: '600px',
        minHeight: '30px',
        border: '1px solid blue',
        background: 'none'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  const onSelect= ({ item, key, keyPath, selectedKeys, domEvent }) => {
    let changeFun = new Function(actionJs?.change);
    changeFun({ item, key, keyPath, selectedKeys, domEvent })
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <Menu
        selectedKeys={[selectedKey]}
        onSelect={onSelect}
        mode={mode}
        style={style}
        items={
          props.children.map(element => {
            return {
              label: element,
              key: element.key
            }
          })
        }
      />
    </div>
  )
}
