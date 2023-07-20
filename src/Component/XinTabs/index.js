import React, {useState, useEffect} from 'react'
import './index.css'
import { Tabs,message } from 'antd';

export default function XinTabs(props) {
  const [style,setStyle] = useState({})
  const [items, setItems] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const {styleCss, actionJs,activeKey,animated,centered,size,tabPosition,tabBarGutter,tabsType} = props

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"400px","minHeight":"400px","border":"1px solid blue"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'400px',
        minHeight:'400px',
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
        minHeight:'400px',
        border:'1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  useEffect(() => {
    const children = props.children;
    const items = children.map(item => {
      return {
        key: item.key,
        label: item.key,
        children: item
      }
    })
    setItems(items)
  },[props.children])

  const onChange = (value) => {
    let fun = new Function(actionJs?.change);
    fun(value)
  }

  return (
    <div>
      {contextHolder}
      <Tabs
        style={style}
        items={items}
        activeKey={activeKey}
        animated={animated}
        centered={centered}
        size={size}
        tabPosition={tabPosition}
        tabBarGutter={parseInt(tabBarGutter)}
        type={tabsType}
        onChange={onChange}
      />
    </div>
  )
}
