import React, { useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'
import LeftList from '../leftList'
import Store from '../../Store'

export default function LeftCom(props) {

  const {changeTopCom} = props
  const [selected,setSelected] = useState(1)

  const onDragStart = (Com,cName) =>{
    return () => {
      changeTopCom({component: Com, name: cName})
    }
  }

  const onDragEnd = (e) => {
    
  }


  return (
    <div className='leftCom'>
      <div className='Tab'>
        <p onClick={() => {setSelected(1)}} style={{background: selected === 2? 'rgb(240 203 203)':''}} className='TabItem'>组件</p>
        <p onClick={() => {setSelected(2)}} style={{background: selected === 1? 'rgb(240 203 203)':''}} className='TabItem'>数据</p>
      </div>
      {
        selected === 1 ?       <div className='componentList'>
        {/*遍历组件库，然后依次在左侧列表展示*/}
        {Object.keys(myComponent).map(cName => {
          const Com = myComponent[cName];
          return  <div onDragEnd={onDragEnd} onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
            <div style={{display: 'inline-block'}} draggable>{cName}</div>
        </div>
        })}
      </div> : <LeftList />
      }
    </div>
  )
}
