import React, {useState,useEffect} from 'react'
import { message } from 'antd';

export default function XinDiv(props) {

  const [style,setStyle] = useState({})
  const { styleCss,visible,actionJs } = props;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"300px","minHeight":"200px","border":"1px solid blue"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'300px',
        minHeight:'200px',
        border:'1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'300px',
        minHeight:'200px',
        border:'1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  return (
    <div style={{display:visible?'none' : 'block'}}>
      {contextHolder}
      <div onClick={onClick} style={style}>

      </div>
    </div>
  )
}
