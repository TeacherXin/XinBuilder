import React, {useState, useEffect} from 'react'
import { List,message } from 'antd';

export default function XinListItem(props) {
  const {styleCss,description,title} = props
  const [messageApi, contextHolder] = message.useMessage();
  const [style, setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
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


  return (
    <List.Item style={style}>
      {contextHolder}
      <List.Item.Meta
        title={title || 'title'}
        description={description || 'this is the listItem description'}
      />
    </List.Item>
  )
}
