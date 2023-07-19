import React,{useState,useEffect} from 'react'
import './index.css'
import {Avatar,message} from 'antd';

export default function XinAvatar(props) {
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const {size,iconType,shape,src,styleCss} = props

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style;
    try {
      style = JSON.parse(styleStr)
    } catch (error) {
      style = {};
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {};
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])


  let Ctor = require('@ant-design/icons')[iconType] ? require('@ant-design/icons')[iconType] : require('@ant-design/icons')['UserOutlined'];
  return (
    <div>
      {contextHolder}
      <Avatar style={style} shape={shape} size={size} icon={<Ctor />} src={src} />
    </div>
  )
}
