import React, { useState,useEffect } from 'react'
import { Menu } from 'antd'

export default function XinMenu(props) {

  const {styleCss,mode,visible,actionJs } = props
  const [style,setStyle] = useState({})

  
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"600px","minHeight":"30px","border":"1px solid blue","background":"none"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const onSelect= ({ item, key, keyPath, selectedKeys, domEvent }) => {
    let changeFun = new Function(actionJs?.change);
    changeFun({ item, key, keyPath, selectedKeys, domEvent })
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      <Menu
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
