import React, { useState,useEffect } from 'react'
export default function XinIcon(props) {

  const {styleCss,iconType,twoToneColor,rotate,visible,actionJs } = props
  const [style,setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','');
    let style = JSON.parse(styleStr || '{}')
    setStyle(style)
  },[styleCss])

  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  let name = iconType
  let Ctor = require('@ant-design/icons')[name] ? require('@ant-design/icons')[name] : require('@ant-design/icons')['SmileOutlined'];

  return (
    <div style={{display: visible ? 'none':'block'}}>
      {
        <Ctor onClick={onClick} twoToneColor={twoToneColor} style={style} rotate={rotate} />
      }
    </div>
  )
}
