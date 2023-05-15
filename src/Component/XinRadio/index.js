import React, { useState,useEffect } from 'react'
import { Radio } from 'antd'
import Store from '../../Store';
import _ from 'lodash'

export default function XinRadio(props) {
  const {attributeValue,actionJs,styleCss,disabled,checked,comId,visible} = props
  const [style,setStyle] = useState({})
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const findNodeByComId = (id) => {
    for(let propName in attributeMap){
      if(propName === id){
        return attributeMap[propName];
      }
      if(attributeMap[propName].childList){
        for(let _propName in attributeMap[propName].childList){
          if(_propName === id){
            return attributeMap[propName].childList[_propName]
          }
        }
      }
    }
  }


  const onClick = () => {
    findNodeByComId(comId).checked = !findNodeByComId(comId)?.checked;
    Store.dispatch({type: 'change',attributeMap});
    let script = document.createElement('script');
    script.innerHTML = actionJs?.click
    document.body.append(script)
  }
  const onChange = (e) =>{
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  }
  
  return (
    <div style={{display: visible ? 'none':'block'}}>
      <Radio
        checked={checked}
        disabled={disabled}
        style={style}
        onClick={onClick}
        onChange={onChange}
        value={comId}
      >
        {attributeValue || 'Radio'}
      </Radio>
    </div>
  )
}
