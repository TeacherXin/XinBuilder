import React, { useEffect, useState } from 'react'
import './index.css'

export default function Input(props) {

  const [value,setValue] = useState('');
  const {attributeValue,onContextMenu,styleCss,actionJs,type,prefix,suffix,placeholder,size} = props

  const sizeMap = {
    'sm': {
      width: '50px',
      height: '12px',
    },
    'md': {
      width: '70px',
      height: '15px',
    },
    'lg': {
      width: '100px',
      height: '30px',
    }
  }

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
      <span className='prefix'>{prefix}</span>
      <input
        style={size? sizeMap[size] : {}}
        onContextMenu={onContextMenu}
        onClick={onClick} value={value || ''}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
      <span className='suffix'>{suffix}</span>
    </div>
  )
}
