import React, { useState } from 'react'

export default function Label(props) {

  const {attributeValue,onClick,className,onContextMenu} = props
  return (
    <div>
      <span onContextMenu={onContextMenu} onClick={onClick} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
