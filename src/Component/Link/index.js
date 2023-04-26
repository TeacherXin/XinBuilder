import React from 'react'
import { useEffect } from 'react';

export default function Link(props) {

  const {renderFlag, onContextMenu, attributeValue, url, openType, actionJs, styleCss} = props

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  const aclick = () => {
    let script = document.createElement('script');
    script.innerHTML = '(function(){' +  actionJs?.click + '})()'
    document.body.append(script)
  }

  return (
    <div>
      <div onClick={aclick} onContextMenu={onContextMenu}>
        {renderFlag? <a target={openType ? '_blank' : ''} href={url || 'https://www.baidu.com'}>{attributeValue || '链接'}</a> : <span>{attributeValue || '链接'}</span>}
      </div>
    </div>
  )
}
