import {React,useEffect,useState} from 'react'
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

export default function XinLink(props) {
  const navigate  = useNavigate();
  const {pageUrl,attributeValue,styleCss,visible} = props; 
  const [messageApi, contextHolder] = message.useMessage();
  const [style,setStyle] = useState({})

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

  const toShowPage = () => {
    navigate('/metaRender',{state: {pageId:pageUrl}});
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <span style={style} onClick={toShowPage}>
        {attributeValue || 'XinLink'}
      </span>
    </div>
  )
}
