// import React, { useState } from 'react'
// import './index.css'
// import { Button } from 'antd';

// export default function RightClickMenu(props) {

//   const {left,showMenu,changeRightPanelById,code} = props;
//   const [showModal,setShowModa] = useState(false)

//   //设置各个组件所展示的属性
//   const showRightPanel = (type,actionName) => {
//     return () => {
//       //属性面板
//       if(type === 'attribute'){
//         setShowModa(false)
//         switch (code) {
//           case 'XinButton': {
//             changeRightPanelById(['attributeValue','buttonType','size','disabled','danger','ghost'],'attribute');
//             break;
//           }
//           case 'XinInput': {
//             changeRightPanelById(['attributeValue','addonBefore','addonAfter','placeholder','size','prefix','suffix','allowClear','label','required','requiredMessage'],'attribute');
//             break;
//           }
//           case 'XinLable': {
//             changeRightPanelById(['attributeValue'],'attribute');
//             break;
//           }
//           case 'XinCheckBox': {
//             changeRightPanelById(['attributeValue','disabled','checked'],'attribute');
//             break;
//           }
//           case 'XinForm': {
//             changeRightPanelById(['disabled','size','layout','colon','labelAlign'],'attribute');
//             break;
//           }
//           case 'XinIcon': {
//             changeRightPanelById(['iconType','twoToneColor','rotate'],'attribute');
//             break;
//           }
//           case 'XinMenu': {
//             changeRightPanelById(['mode'],'attribute');
//             break;
//           }
//         }
//       //动作弹窗
//       }else if(type === 'action'){
//         changeRightPanelById(['attributeValue'],'action',actionName);
//         setShowModa(false)
//       }else if(type === 'style'){
//         changeRightPanelById(['attributeValue'],'style');
//         setShowModa(false)
//       }
//     }
//   }

//   const openActionModal= () => {
//     setShowModa(true)
//   }

//   return (
//     <div>
//       <div style={{position: 'relative',left: left + 'px',display: showMenu? 'block':'none'}} className='menu'>
//         <Button style={{borderRadius:'0'}} type='text' onClick={showRightPanel('attribute')} className='menuItem'>设置属性</Button>
//         <Button style={{borderRadius:'0'}} type='text' onClick={showRightPanel('style')} className='menuItem'>设置样式</Button>
//         <Button style={{borderRadius:'0'}} type='text' onMouseEnter={openActionModal} className='menuItem'>设置动作</Button>
//         <div style={{display: showModal? 'block' : 'none'}} className='nextMenu'>
//           <Button style={{borderRadius:'0'}} type='text' onClick={showRightPanel('action','click')} className='nextMenuItem'>click事件</Button>
//           <Button style={{borderRadius:'0'}} type='text' onClick={showRightPanel('action','change')} className='nextMenuItem'>change事件</Button>
//         </div>
//       </div>

//     </div>
//   )
// }
