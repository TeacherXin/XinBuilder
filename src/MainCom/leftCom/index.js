import React, { useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'

export default function LeftCom(props) {

  const {changeTopCom, changeChildStyle} = props

  const [style,setStyle] = useState({})

  const onDragStart = (Com) =>{
    return () => {
      changeTopCom(<Com/>)
      changeChildStyle(style)
    }
  }

  const onDragEnd = (e) => {
    
  }

  const setChildStyle = (style) => {
    setStyle(style)
  }


  return (
    <div className='leftCom'>
      <div className='componentList'>
        {Object.keys(myComponent).map(cName => {
          const Com = myComponent[cName];
          return  <div onDragEnd={onDragEnd} onDragStart={onDragStart(Com)} key={cName} className='componentItem'>
            <div style={{display: 'inline-block'}} draggable><Com setChildStyle={setChildStyle} /></div>
        </div>
        })}
      </div>
    </div>
  )
}
