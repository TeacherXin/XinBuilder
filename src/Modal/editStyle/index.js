import React from 'react'
import './index.css'

export default function EditStyle(props) {
  const {changeStyleCss,submitStyle,styleCss,showStyle} = props
  return (
    <div style={{display: showStyle ? 'block' : 'none'}} className='editStyle'>
      <textarea className='textarea' onChange={changeStyleCss} value={styleCss}></textarea>
      <div className='styleFooter'>
        <button onClick={submitStyle(false)}>取消</button>
        <button onClick={submitStyle(true)}>确定</button>
      </div>
  </div>
  )
}
