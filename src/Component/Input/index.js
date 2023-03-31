import React, { useEffect, useState } from 'react'
import './index.css'

export default function Input(props) {

  const [value,setValue] = useState('');
  const {attributeValue,onContextMenu,styleCss,actionJs} = props

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
    <div >
      <input 
        className='componentInput'
        onContextMenu={onContextMenu}
        onClick={onClick} value={value || ''}
        onChange={onChange}
      />
    </div>
  )
}
