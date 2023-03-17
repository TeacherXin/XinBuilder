import React, { useState } from 'react'
import './index.css'

export default function Label(props) {

  const {attributeValue,onClick,className,onContextMenu} = props
  return (
    <div className='label'>
      <span onContextMenu={onContextMenu} onClick={onClick} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
