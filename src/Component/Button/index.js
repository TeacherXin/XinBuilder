import React, { useEffect, useState } from 'react'
import './index.css'

export default function Button(props) {

  const {attributeValue,onClick,className,onContextMenu,actionJs} = props

  const btnClick = () => {
    onClick();
    let script = document.createElement('script')
    script.innerHTML = actionJs
    document.getElementById('componentButton').append(script)
  }

  return (
    <div id='componentButton'>
      <button onContextMenu={onContextMenu} className={className} onClick={btnClick}>{attributeValue || '按钮'}</button>
    </div>
  )
}
