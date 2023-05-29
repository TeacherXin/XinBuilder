import {React, useState,useEffect} from 'react'
import { Carousel } from 'antd'

export default function XinCarousel(props) {

  const [style,setStyle] = useState({})
  const { styleCss,visible,autoplay,actionJs} = props;

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"width":"600px","height":"200px","border":"1px solid blue"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

 
  const onChange = (value) => {
    let fun = new Function(actionJs?.change);
    fun(value)
  }

  return (
    <div style={{display:visible? 'none':'block',...style}}>
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
