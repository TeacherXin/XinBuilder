import React, { useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'

export default function LeftCom(props) {

  const {changeTopCom} = props

  const onDragStart = (Com,cName) =>{
    return () => {
      changeTopCom({component: Com, name: cName})
    }
  }

  const onDragEnd = (e) => {
    
  }


  return (
    <div className='leftCom'>
      <div className='componentList'>
        {/*遍历组件库，然后依次在左侧列表展示*/}
        {Object.keys(myComponent).map(cName => {
          const Com = myComponent[cName];
          let leftCom;
          if(cName === 'Table'){
            leftCom = '表格'
          }else{
            leftCom=<Com />
          }
          return  <div onDragEnd={onDragEnd} onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
            <div style={{display: 'inline-block'}} draggable>{leftCom}</div>
        </div>
        })}
      </div>
    </div>
  )
}
