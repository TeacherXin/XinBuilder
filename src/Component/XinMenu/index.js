import React, { useState,useEffect } from 'react'
import { Menu } from 'antd'

export default function XinMenu(props) {

  const {styleCss,mode } = props
  const [style,setStyle] = useState({})
  const [items,setItems] = useState([])

  
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"600px","minHeight":"30px","border":"1px solid blue","background":"none"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  return (
    <div>
        <Menu
          mode={mode}
          style={style}
          items={
            props.children.map(element => {
              return {
                label: element,
                key: element.key
              }
            })
          }
        />
    </div>
  )
}
