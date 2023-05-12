import React, { useEffect, useState } from 'react'
import './index.css'
import { Input } from 'antd'
import Store from '../../Store';
import _ from 'lodash'
export default function XinInput(props) {

  const [value,setValue] = useState('');
  const [style,setSyle] = useState({})
  const {attributeValue,styleCss,actionJs,addonBefore,addonAfter,placeholder,size,prefix,suffix,allowClear,showCount,comId,visible} = props
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
  const onChange = (e) =>{
    setValue(e.target.value);
    findNodeByComId(comId).attributeValue = e.target.value;
    Store.dispatch({type: 'change',attributeMap});
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  }

  useEffect(() => {
    setValue(attributeValue)
  },[attributeValue])

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  return (
    <div style={{display: visible ? 'none':'block'}} className='componentInput'>
      <Input
        size={size}
        prefix={prefix}
        suffix={suffix}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        allowClear={allowClear}
        showCount={showCount}
        onClick={onClick}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
    </div>
  )
}
