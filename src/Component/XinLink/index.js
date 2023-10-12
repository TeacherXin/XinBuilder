import {React,useEffect,useState} from 'react'
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

export default function XinLink(props) {
  const navigate  = useNavigate();
  const {pageUrl,attributeValue,styleCss,visible} = props; 
  const [messageApi, contextHolder] = message.useMessage();
  // link组件的样式
  const [style,setStyle] = useState({})

  /**
   * 当样式配置好后，更新link组件的style值
   * @level 3
   */
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

  /**
   * 跳转到对应pageId的页面
   * @level 3
   */
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
