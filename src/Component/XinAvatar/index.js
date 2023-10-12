import React,{useState,useEffect} from 'react'
import './index.css'
import {Avatar,message} from 'antd';

export default function XinAvatar(props) {
  //头像组件的样式
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const {size,iconType,shape,src,styleCss,actionJs} = props

  /**
   * 当styleCss变化时，更新组件的style
   * @level 3
   */
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

  /**
   * 按钮的点击事件
   * @param {*} e 事件对象
   * @level 3
   */
  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  let Ctor = require('@ant-design/icons')[iconType] ? require('@ant-design/icons')[iconType] : require('@ant-design/icons')['UserOutlined'];
  return (
    <div>
      {contextHolder}
      <Avatar onClick={onClick} style={style} shape={shape} size={size} icon={<Ctor />} src={src} />
    </div>
  )
}
