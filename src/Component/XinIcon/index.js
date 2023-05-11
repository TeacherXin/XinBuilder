import React, { useState,useEffect } from 'react'
export default function XinIcon(props) {

  const {onContextMenu,styleCss,iconType,twoToneColor,rotate } = props
  const [style,setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','');
    let style = JSON.parse(styleStr || '{}')
    setStyle(style)
  },[styleCss])

  let name = iconType
  let Ctor = require('@ant-design/icons')[name] ? require('@ant-design/icons')[name] : require('@ant-design/icons')['SmileOutlined'];

  return (
    <div onContextMenu={onContextMenu}>
      {
        <Ctor twoToneColor={twoToneColor} style={style} rotate={rotate} />
      }
    </div>
  )
}
