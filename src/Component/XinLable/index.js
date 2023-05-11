import React, { useState } from 'react'
import './index.css'

export default function Label(props) {

  const {attributeValue,className,onContextMenu,actionJs} = props

  const onClick = (e) => {
    let script = document.createElement('script');
    script.innerHTML = '(function(){' +  actionJs?.click + '})()'
    document.body.append(script)
  }

  return (
    <div className='label'>
      <span onContextMenu={onContextMenu} onClick={onClick} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
