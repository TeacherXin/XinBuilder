import React from 'react'
import './index.css'

export default function RightClickMenu(props) {

  const {left,showMenu,changeRightPanelById,code} = props;

  //设置各个组件所展示的属性
  const showRightPanel = () => {
    switch (code) {
      case 'Button': {
        changeRightPanelById(['attributeValue']);
        break;
      }
      case 'Input': {
        changeRightPanelById(['attributeValue']);
        break;
      }
      case 'Label': {
        changeRightPanelById(['attributeValue']);
        break;
      }
    }
  }

  return (
    <div style={{position: 'relative',left: left + 'px',display: showMenu? 'block':'none'}} className='menu'>
      <p onClick={showRightPanel} className='menuItem'>设置属性</p>
      <p className='menuItem'>设置样式</p>
      <p className='menuItem'>设置动作</p>
    </div>
  )
}
