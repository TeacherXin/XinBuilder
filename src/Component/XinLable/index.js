import React, { useState,useEffect } from 'react'
import './index.css'

export default function Label(props) {

  const [style,setStyle] = useState({})
  const {attributeValue,className,actionJs,styleCss} = props

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','');
    let style = JSON.parse(styleStr || '{}')
    setStyle(style)
  },[styleCss])


  const onClick = (e) => {
    let script = document.createElement('script');
    script.innerHTML = '(function(){' +  actionJs?.click + '})()'
    document.body.append(script)
  }

  return (
    <div className='label'>
      <span style={{...style,display:'inline-block'}} onClick={onClick} className={className}>{attributeValue || '标签'}</span>
    </div>
  )
}
