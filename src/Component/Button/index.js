import React, { useEffect, useState } from 'react'
import './index.css'

export default function Button(props) {

  const {attributeValue,onClick,className} = props

  return (
    <div>
      <button className={className} onClick={onClick}>{attributeValue || '按钮'}</button>
    </div>
  )
}
