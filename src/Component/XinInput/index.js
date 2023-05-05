import React, { useEffect, useState } from 'react'
import './index.css'
import { Input } from 'antd'
import Store from '../../Store';
import _ from 'lodash'
export default function XinInput(props) {

  const [value,setValue] = useState('');
  const [style,setSyle] = useState({})
  const {attributeValue,onContextMenu,styleCss,actionJs,addonBefore,addonAfter,placeholder,size,prefix,suffix,allowClear,showCount,comId} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

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
    attributeMap[comId].attributeValue = e.target.value;
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
    <div className='componentInput'>
      <Input
        size={size}
        prefix={prefix}
        suffix={suffix}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        allowClear={allowClear}
        showCount={showCount}
        onContextMenu={onContextMenu}
        onClick={onClick} value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
    </div>
  )
}
