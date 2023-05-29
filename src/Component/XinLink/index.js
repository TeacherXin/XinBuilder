import {React,useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function XinLink(props) {
  const navigate  = useNavigate();
  const {pageUrl,attributeValue,styleCss,visible} = props; 
  const [style,setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','');
    let style = JSON.parse(styleStr || '{}')
    setStyle(style)
  },[styleCss])

  const toShowPage = () => {
    navigate('/metaRender',{state: {pageId:pageUrl}});
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      <span style={style} onClick={toShowPage}>
        {attributeValue || 'XinLink'}
      </span>
    </div>
  )
}
