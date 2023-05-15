import React, { useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import Store from '../../Store';
import _ from 'lodash'

export default function XinNumber(props) {

  const [value,setValue] = useState('');
  const [style,setSyle] = useState({})
  const {attributeValueNumber,styleCss,actionJs,placeholder,size,prefix,showCount,comId,visible,max,min,step} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

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

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style = JSON.parse(styleStr)
    setSyle(style)
  },[styleCss])

  const onClick = () => {
    let script = document.createElement('script');
    script.innerHTML = actionJs?.click
    document.body.append(script)
  }
  const onChange = (value) =>{
    setValue(value);
    findNodeByComId(comId).attributeValue = value;
    Store.dispatch({type: 'change',attributeMap});
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  }

  useEffect(() => {
    setValue(attributeValueNumber)
  },[attributeValueNumber])

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  return (
    <div style={{display: visible ? 'none':'block'}}>
      <InputNumber
        size={size}
        prefix={prefix}
        showCount={showCount}
        onClick={onClick}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        max={max}
        min={min}
        step={step}
      />
    </div>
  )
}
