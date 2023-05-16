import React, {useState,useEffect} from 'react'
import { Card, Space } from 'antd';
import subscribe from '../../DefineHook/subscribe';

export default function XinCard(props) {

  const [style,setStyle] = useState({})
  const { styleCss,size,title,bordered } = props
  const [update,setUpdate] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"300px","minHeight":"200px"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })

  return (
    <div>
      <Card
        size={size}
        title={title || '卡片标题'}
        bordered={bordered}
      >
        <div style={style}>
          {(props?.children || []).map(item => {
            return item
          })}
        </div>
      </Card>
    </div>
  )
}
