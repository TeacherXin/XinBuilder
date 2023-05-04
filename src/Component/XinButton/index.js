import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import './index.css'

export default function XinButton(props) {

  const {attributeValue,onClick,onContextMenu,actionJs,styleCss,buttonType,size,disabled,danger,ghost} = props

  const [style,setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const btnClick = () => {
    if(!disabled){
      onClick();
      let script = document.createElement('script');
      script.innerHTML = '(function(){' +  actionJs?.click + '})()'
      document.body.append(script)
    }
  }

  return (
    <div id='componentButton'>
      <Button
        type={buttonType || 'primary'}
        onContextMenu={onContextMenu}
        onClick={btnClick}
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
