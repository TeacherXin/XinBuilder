import React, {useState,useEffect} from 'react'
import subscribe from '../../DefineHook/subscribe';

export default function XinFlex(props) {

  const [style,setStyle] = useState({})
  const { styleCss,visible } = props
  const [update,setUpdate] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"400px","minHeight":"300px","border":"1px solid blue"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })
  return (
    <div style={{display: visible ? 'none' : 'block'}}>
      <div style={{...style,display:'flex'}}>
        {(props?.children || []).map(item => {
          return item
        })}
      </div>
    </div>
  )
}
