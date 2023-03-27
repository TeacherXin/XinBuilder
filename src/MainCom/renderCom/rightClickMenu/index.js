import React, { useState } from 'react'
import './index.css'

export default function RightClickMenu(props) {

  const {left,showMenu,changeRightPanelById,code} = props;
  const [showModal,setShowModa] = useState(false)

  //设置各个组件所展示的属性
  const showRightPanel = (type,actionName) => {
    return () => {
      //属性面板
      if(type === 'attribute'){
        switch (code) {
          case 'Button': {
            changeRightPanelById(['attributeValue'],'attribute');
            break;
          }
          case 'Input': {
            changeRightPanelById(['attributeValue'],'attribute');
            break;
          }
          case 'Label': {
            changeRightPanelById(['attributeValue'],'attribute');
            break;
          }
          case 'Table': {
            changeRightPanelById(['attributeValue'],'attribute');
            break;
          }
        }
      //动作弹窗
      }else if(type === 'action'){
        changeRightPanelById(['attributeValue'],'action',actionName);
        setShowModa(false)
      }else if(type === 'style'){
        changeRightPanelById(['attributeValue'],'style');
      }
    }
  }

  const openActionModal= () => {
    setShowModa(true)
  }

  return (
    <div>
      <div style={{position: 'relative',left: left + 'px',display: showMenu? 'block':'none'}} className='menu'>
        <p onClick={showRightPanel('attribute')} className='menuItem'>设置属性</p>
        <p onClick={showRightPanel('style')} className='menuItem'>设置样式</p>
        <p onMouseEnter={openActionModal} className='menuItem'>设置动作</p>
        <div style={{display: showModal? 'block' : 'none'}} className='nextMenu'>
          <p onClick={showRightPanel('action','click')} className='nextMenuItem'>click事件</p>
          <p onClick={showRightPanel('action','change')} className='nextMenuItem'>change事件</p>
        </div>
      </div>

    </div>
  )
}
