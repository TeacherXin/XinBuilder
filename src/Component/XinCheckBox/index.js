import React, { useState,useEffect } from 'react'
import { Checkbox } from 'antd'

export default function XinCheckBox(props) {
  const {attributeValue,onContextMenu,actionJs,styleCss,disabled} = props
  const [style,setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const onClick = () => {
    let script = document.createElement('script');
    script.innerHTML = actionJs?.click
    document.body.append(script)
  }
  const onChange = (e) =>{
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  }

  return (
    <div onContextMenu={onContextMenu}>
      <Checkbox
        disabled={disabled}
        style={style}
        onClick={onClick}
        onChange={onChange}
      >
        {attributeValue || 'CheckBox'}
      </Checkbox>
    </div>
  )
}
