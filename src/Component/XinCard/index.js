import React, {useState,useEffect} from 'react'
import { Card, message } from 'antd';
import subscribe from '../../DefineHook/subscribe';

export default function XinCard(props) {

  //card组件的style
  const [style,setStyle] = useState({})
  const { styleCss,size,title,bordered,visible } = props
  //redux更新时的更新状态
  const [update,setUpdate] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 给card组件初始样式配置，当styleCss变化时，修改card组件的style
   * @level 3
   */
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

  /**
   * redux组件状态更新时触发
   * @level 3
   */
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
