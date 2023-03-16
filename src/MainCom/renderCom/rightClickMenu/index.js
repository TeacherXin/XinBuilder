import React from 'react'
import './index.css'

export default function RightClickMenu(props) {

  const {left,showMenu} = props;

  return (
    <div style={{position: 'relative',left: left + 'px',display: showMenu? 'block':'none'}} className='menu'>
      <p className='menuItem'>设置属性</p>
      <p className='menuItem'>设置样式</p>
      <p className='menuItem'>设置动作</p>
    </div>
  )
}
