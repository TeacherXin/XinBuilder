import React, { useState,useEffect } from 'react'
import './index.css'

export default function Label(props) {

  const [style,setStyle] = useState({})
  const {attributeValue,className,actionJs,styleCss,visible} = props

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','');
    let style = JSON.parse(styleStr || '{}')
    setStyle(style)
  },[styleCss])


  return (
    <div style={{display: visible ? 'none':'block'}} className='label'>
      <span style={{...style,display:'inline-block'}} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
