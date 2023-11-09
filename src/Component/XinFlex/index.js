import React, {useState,useEffect} from 'react'
import subscribe from '../subscribe';
import { message } from 'antd';

export default function XinFlex(props) {

  // Flex组件的样式
  const [style,setStyle] = useState({})
  const { styleCss,visible } = props
  const [messageApi, contextHolder] = message.useMessage();
  // redux更新时需要更新组件的状态
  const [update,setUpdate] = useState({})

  /**
   * 给Flex组件设置初始样式，当配置好样式后，更新组件的style
   * @level 3
   */
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"400px","minHeight":"300px","border":"1px solid blue"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'400px',
        minHeight:'300px',
        border:'1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'400px',
        minHeight:'300px',
        border:'1px solid blue'
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
      <div style={{...style,display:'flex'}}>
        {(props?.children || []).map(item => {
          return item
        })}
      </div>
    </div>
  )
}
