import React, {useState,useEffect} from 'react'
import { message } from 'antd';

export default function XinDiv(props) {

  // div组件的样式
  const [style,setStyle] = useState({})
  const { styleCss,visible,actionJs, src } = props;
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 给div组件初始化样式，当配置好样式后，更新div组件的style
   * @level 3
   */
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

  /**
   * div的点击事件
   * @param {*} e 事件对象
   * @level 3
   */
  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  return (
    <div style={{display:visible?'none' : 'block'}}>
      {contextHolder}
      <div onClick={onClick} style={{...style, backgroundImage: `url(${src})`, backgroundSize:'cover'}}>
      </div>
    </div>
  )
}
