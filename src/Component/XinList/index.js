import React, {Children, useEffect, useState} from 'react'
import { List,message } from 'antd';
import './index.css'

export default function XinList(props) {
  const {styleCss,children,bordered,size,actionJs} = props
  const [messageApi, contextHolder] = message.useMessage();
  // list组件的样式
  const [style, setStyle] = useState({})
  // list组件的data
  const [data, setData] = useState([])

  /**
   * 初始化列表数据，调用list的onload事件。一般指的是从接口获取数据
   * @level 3
   */
  useEffect((e) => {
    let loadFun = new Function(actionJs?.load);
    loadFun(e)
  },[])

  /**
   * 初始化list的样式，当配置好样式后，更新list组件的style
   * @level 3
   */
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

  /**
   * 当向list组件中，拖入listItem后，更新list的data。
   * @level 3
   */
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
