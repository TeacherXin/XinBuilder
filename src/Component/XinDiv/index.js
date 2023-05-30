import React, {useState,useEffect} from 'react'

export default function XinDiv(props) {

  const [style,setStyle] = useState({})
  const { styleCss,visible,actionJs } = props;

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"300px","minHeight":"200px","border":"1px solid blue"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const onClick = (e) => {
    let clickFun = new Function(actionJs?.click);
    clickFun(e)
  }

  return (
    <div style={{display:visible?'none' : 'block'}}>
      <div onClick={onClick} style={style}>

      </div>
    </div>
  )
}
