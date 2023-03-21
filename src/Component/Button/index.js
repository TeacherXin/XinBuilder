import React, { useEffect, useState } from 'react'
import './index.css'

export default function Button(props) {

  const {attributeValue,onClick,className,onContextMenu,actionJs,styleCss} = props

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  const btnClick = () => {
    onClick();
    let script = document.createElement('script');
    script.innerHTML = actionJs
    document.body.append(script)
  }

  return (
    <div id='componentButton'>
      <button onContextMenu={onContextMenu} className={className} onClick={btnClick}>{attributeValue || '按钮'}</button>
    </div>
  )
}
