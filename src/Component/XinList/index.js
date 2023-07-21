import React, {Children, useEffect, useState} from 'react'
import { List,message } from 'antd';
import './index.css'

export default function XinList(props) {
  const {styleCss,children,bordered,size,actionJs} = props
  const [messageApi, contextHolder] = message.useMessage();
  const [style, setStyle] = useState({})
  const [data, setData] = useState([])

  useEffect((e) => {
    let loadFun = new Function(actionJs?.load);
    loadFun(e)
  },[])

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"600px","minHeight":"400px","border":"1px solid blue"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'600px',
        minHeight:'400px'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'600px',
        minHeight:'400px'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  useEffect(() => {
    const data = props.children.map(item => {
      return {
        title: window.findNodeByComId(item.key)?.attributeValue || '123'
      }
    })
    setData(data)
  },[props.children])

  return (
    <div className='ListItem'>
      {contextHolder}
      <List
        style={style}
        itemLayout="vertical"
        dataSource={data}
        bordered={bordered}
        size={size}
      >
        {
          children.map((item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={item}
              />
            </List.Item>
          ))
        }
      </List>
    </div>
  )
}
