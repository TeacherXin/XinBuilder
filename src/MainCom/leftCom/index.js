import React, { useEffect, useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'
import LeftList from '../leftList'
import { Collapse, Tabs } from 'antd';
import {componentTextMap, componentIconMap} from './Util/iconList'
import {  RightOutlined,LeftOutlined} from '@ant-design/icons'

const { Panel } = Collapse;

export default function LeftCom(props) {

  const {changeTopCom} = props
  const [containerList,setContanerList] = useState([])
  const [controlList,setControlList] = useState([])
  const [showDataList,setShowDataList] = useState([])
  const [showLeftPanel,setShowLeftPanel] = useState(true)

  useEffect(() => {
    Object.keys(myComponent).forEach(item => {
      if(['XinForm','XinMenu','XinRadioGroup','XinCard','XinFlex','XinCarousel','XinTabs','XinList'].includes(item)){
        containerList.push(item)
      }else if(['XinTable','XinDiv','XinAvatar','XinListItem'].includes(item)){
        showDataList.push(item)
      }else{
        controlList.push(item)
      }
    })
    setContanerList([...containerList])
    setControlList([...controlList])
    setShowDataList([...showDataList])
  },[])

  const onDragStart = (Com,cName,groupType) =>{
    return () => {
      changeTopCom({component: Com, name: cName,groupType})
    }
  }

  const getTabPane = () => {
    return  [
      {
        key: 'com',
        label: <div style={{fontSize:'18px',width:'100px',textAlign:'center'}}>组件</div>,
        children: <Collapse defaultActiveKey={['1']} style={{width:"100%",background:'none',height:'100%',overflow:'auto',marginTop:'-16px',borderRadius:'0'}}>
        <Panel header={<span style={{fontWeight:"bold"}}>容器类型组件</span>} key="1" style={{background:'none',height:'100%'}}>
          {containerList.map(cName => {
            const Com = myComponent[cName];
            const Icon = componentIconMap[cName]
            const name = componentTextMap[cName]
            return  <div onDragStart={onDragStart(Com,cName,'container')} key={cName} className='componentItem'>
              <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} /><span>{name}</span></div>
          </div>
          })}
        </Panel>
        <Panel header={<span style={{fontWeight:"bold"}}>数据录入组件</span>} key="2">
          {controlList.map(cName => {
            const Com = myComponent[cName];
            const Icon = componentIconMap[cName]
            const name = componentTextMap[cName]
            return  <div onDragStart={onDragStart(Com,cName,'controlCin')} key={cName} className='componentItem'>
              <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} /><span>{name}</span></div>
          </div>
          })}
        </Panel>
        <Panel header={<span style={{fontWeight:"bold"}}>数据展示组件</span>} key="3">
          {showDataList.map(cName => {
            const Com = myComponent[cName];
            const Icon = componentIconMap[cName]
            const name = componentTextMap[cName]
            return  <div onDragStart={onDragStart(Com,cName,'controlCout')} key={cName} className='componentItem'>
              <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} /><span>{name}</span></div>
          </div>
          })}
        </Panel>
        <Panel header={<span style={{fontWeight:"bold"}}>自定义组件</span>} key="4">
          <div onDragStart={onDragStart('defineCom','defineCom','defineCom')} className='componentItem'>
            <div style={{display: 'inline-block'}} draggable>{'defineCom'}</div>
          </div>
        </Panel>
      </Collapse>
      },
      {
        key: 'data',
        label: <div style={{display:'flex'}}><div style={{fontSize:'16px',width:'80px',textAlign:'center'}}>数据</div><LeftOutlined onClick={() => {setShowLeftPanel(false)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer',position:'relative',left:'30px'}} /></div>,
        children: <LeftList />
      }
    ];
  }


  return (
    showLeftPanel? <div className='leftCom'>
      <Tabs defaultActiveKey="1" items={getTabPane()} />
    </div> : <RightOutlined onClick={() => {setShowLeftPanel(true)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer'}} />
  )
}
