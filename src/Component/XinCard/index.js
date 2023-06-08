import React, {useState,useEffect} from 'react'
import { Card, message } from 'antd';
import subscribe from '../../DefineHook/subscribe';

export default function XinCard(props) {

  const [style,setStyle] = useState({})
  const { styleCss,size,title,bordered,visible } = props
  const [update,setUpdate] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"300px","minHeight":"200px"}';
    let style;
    try {
      style = JSON.parse(styleStr)
    } catch (error) {
      style = {
        minWidth:'300px',
        minHeight:'200px'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'300px',
        minHeight:'200px'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })

  return (
    <div style={{display: visible ? 'none' : 'block'}}>
      {contextHolder}
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
