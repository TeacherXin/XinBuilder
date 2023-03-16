import React, { useState } from 'react'

export default function Label(props) {

  const {attributeValue,onClick,className} = props
  return (
    <div>
      <span onClick={onClick} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
