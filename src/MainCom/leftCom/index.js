import React, { useEffect, useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'
import LeftList from '../leftList'
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function LeftCom(props) {

  const {changeTopCom} = props
  const [selected,setSelected] = useState(1)
  const [containerList,setContanerList] = useState([])
  const [controlList,setControlList] = useState([])

  useEffect(() => {
    Object.keys(myComponent).forEach(item => {
      if(['XinForm','XinMenu'].includes(item)){
        containerList.push(item)
      }else{
        controlList.push(item)
      }
    })
    setContanerList([...containerList])
    setControlList([...controlList])
  },[])

  const onDragStart = (Com,cName) =>{
    return () => {
      changeTopCom({component: Com, name: cName})
    }
  }


  return (
    <div className='leftCom'>
      <div className='Tab'>
        <p onClick={() => {setSelected(1)}} style={{background: selected === 2? 'rgb(240 203 203)':''}} className='TabItem'>组件</p>
        <p onClick={() => {setSelected(2)}} style={{background: selected === 1? 'rgb(240 203 203)':''}} className='TabItem'>数据</p>
      </div>
      {
        selected === 1 ? <div className='componentList'>
        {
          <Collapse defaultActiveKey={['1']} style={{width:"100%",background:'none',height:'100%'}}>
            <Panel header="容器类型组件" key="1" style={{background:'none',height:'100%'}}>
              {containerList.map(cName => {
                const Com = myComponent[cName];
                return  <div onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
                  <div style={{display: 'inline-block'}} draggable>{cName}</div>
              </div>
              })}
            </Panel>
            <Panel header="基础类型组件" key="2">
              {controlList.map(cName => {
                const Com = myComponent[cName];
                return  <div onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
                  <div style={{display: 'inline-block'}} draggable>{cName}</div>
              </div>
              })}
            </Panel>
          </Collapse>
        }
      </div> : <LeftList />
      }
    </div>
  )
}
