import {React, useState,useEffect} from 'react'
import { Carousel,message } from 'antd'

export default function XinCarousel(props) {

  const [style,setStyle] = useState({})
  const { styleCss,visible,autoplay,actionJs} = props;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"width":"600px","height":"200px","border":"1px solid blue"}';
    let style;
    try {
      style = JSON.parse(styleStr)
    } catch (error) {
      style = {
        minWidth:'600px',
        minHeight:'200px',
        border: '1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'600px',
        minHeight:'200px',
        border: '1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

 
  const onChange = (value) => {
    let fun = new Function(actionJs?.change);
    fun(value)
  }

  return (
    <div style={{display:visible? 'none':'block',...style}}>
      {contextHolder}
      <Carousel
        autoplay={autoplay}
        afterChange={onChange}
      >
        {(props?.children || []).map(item => {
          return item
        })}
      </Carousel>
    </div>
  )
}
