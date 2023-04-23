import React, { useEffect, useState } from 'react'
import './index.css'

export default function Button(props) {

  const {attributeValue,onClick,className,onContextMenu,actionJs,styleCss,size,disable} = props
  const sizeMap = {
    'sm': {
      width: '70px',
      height: '20px',
      fontSize: '12px'
    },
    'md': {
      width: '75px',
      height: '28px',
      fontSize: '14px'
    },
    'lg': {
      width: '100px',
      height: '30px',
      fontSize: '15px'
    }
  }

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  const btnClick = () => {
    onClick();
    let script = document.createElement('script');
    script.innerHTML = '(function(){' +  actionJs?.click + '})()'
    document.body.append(script)
  }

  return (
    <div id='componentButton'>
      <button className={disable? 'disableButton': 'button'} style={size? sizeMap[size] : {}} onContextMenu={onContextMenu} onClick={btnClick}>{attributeValue || '默认按钮'}</button>
    </div>
  )
}
