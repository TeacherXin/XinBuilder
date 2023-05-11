import React, { useState,useEffect } from 'react'
import { Checkbox } from 'antd'
import Store from '../../Store';
import _ from 'lodash'

export default function XinCheckBox(props) {
  const {attributeValue,actionJs,styleCss,disabled,checked,comId,visible} = props
  const [style,setStyle] = useState({})
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const onClick = () => {
    let script = document.createElement('script');
    script.innerHTML = actionJs?.click
    document.body.append(script)
  }
  const onChange = (e) =>{
    attributeMap[comId].checked = !attributeMap?.[comId]?.checked;
    Store.dispatch({type: 'change',attributeMap});
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        style={style}
        onClick={onClick}
        onChange={onChange}
      >
        {attributeValue || 'CheckBox'}
      </Checkbox>
    </div>
  )
}
