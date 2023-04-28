import React, { useEffect, useState } from 'react'
import './index.css'
import { Input } from 'antd'
export default function XinInput(props) {

  const [value,setValue] = useState('');
  // const {attributeValue,onContextMenu,styleCss,actionJs,type,addonBefore,addonAfter,placeholder,size} = props
  const {attributeValue,onContextMenu,styleCss,actionJs,addonBefore,addonAfter,placeholder,size,prefix,suffix,allowClear,showCount} = props

  const onClick = () => {
    let script = document.createElement('script');
    script.innerHTML = actionJs?.click
    document.body.append(script)
  }
  const onChange = (e) =>{
    setValue(e.target.value);
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
        style={{width: 80}}
        onContextMenu={onContextMenu}
        onClick={onClick} value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
