import React from 'react'
import './index.css'

export default function RightClickMenu(props) {

  const {left,showMenu,changeRightPanelById,code} = props;

  //设置各个组件所展示的属性
  const showRightPanel = (type) => {
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
        }
      //动作弹窗
      }else if(type === 'action'){
        changeRightPanelById(['attributeValue'],'action');
      }else if(type === 'style'){
        changeRightPanelById(['attributeValue'],'style');
      }
    }
  }

  return (
    <div>
      <div style={{position: 'relative',left: left + 'px',display: showMenu? 'block':'none'}} className='menu'>
        <p onClick={showRightPanel('attribute')} className='menuItem'>设置属性</p>
        <p onClick={showRightPanel('style')} className='menuItem'>设置样式</p>
        <p onClick={showRightPanel('action')} className='menuItem'>设置动作</p>
      </div>

    </div>
  )
}
