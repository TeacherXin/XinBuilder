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


  const onChange = (e) =>{
    findNodeByComId(comId).checked = !findNodeByComId(comId)?.checked;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.change);
    changeFun(e);
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        style={style}
        onChange={onChange}
      >
        {attributeValue || 'CheckBox'}
      </Checkbox>
    </div>
  )
}
