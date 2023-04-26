import React from 'react'

export default function Link(props) {

  const {renderFlag, onContextMenu, attributeValue, url, openType} = props

  return (
    <div>
      <div onContextMenu={onContextMenu}>
        {renderFlag? <a target={openType ? '_blank' : ''} href={url || 'https://www.baidu.com'}>{attributeValue || '链接'}</a> : <span>{attributeValue || '链接'}</span>}
      </div>
    </div>
  )
}
