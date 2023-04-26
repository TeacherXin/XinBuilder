import React from 'react'
import { useEffect } from 'react';

export default function List(props) {
  const {listItemNum,onContextMenu,actionJs,styleCss,title} = props

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  const ulClick = () => {
    let script = document.createElement('script');
    script.innerHTML = '(function(){' +  actionJs?.click + '})()'
    document.body.append(script)
  }

  return (
    <div>
      <ul onClick={ulClick} onContextMenu={onContextMenu}>
        {<p style={{position: 'relative',bottom:'13px',right:'40px'}}>{title || '列表'}</p>}
        {new Array(parseInt(listItemNum || 0)).fill(0).map((item,index) => {
          return <li key={index}>子元素</li>
        })}
      </ul>
    </div>
  )
}
