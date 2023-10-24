import React, { useEffect, useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'
import LeftList from '../leftList'
import { Collapse, Tabs } from 'antd';
import {componentTextMap, componentIconMap} from './Util/iconList'
import {  RightOutlined,LeftOutlined} from '@ant-design/icons'
import axios from 'axios'

const { Panel } = Collapse;

export default function LeftCom(props) {
  const {changeTopCom} = props
  // 容器类型控件
  const [containerList,setContanerList] = useState([])
  // 数据录入类型控件
  const [controlList,setControlList] = useState([])
  // 数据展示类型控件
  const [showDataList,setShowDataList] = useState([])
  // 是否展示左侧组件区域
  const [showLeftPanel,setShowLeftPanel] = useState(true)
  // 自定义组件列表
  const [defineComList, setDefineComList] = useState([])

  /**
   * 获取自定义组件列表，在左侧组件列表进行展示
   * @level 3
   */
  const getDefineComList = async () => {
    const res = await axios.get(`http://${window.location.hostname}:3000/api/getpackage`)
    let packageList = res.data.packageList;
    const defineComList = []
    for(let i=0;i<packageList.length;i++){
      const item = packageList[i];
      const res = await axios.get(`http://${window.location.hostname}:3000/api/getcomFile?fileDirName=${item.fileDirName}`);
      defineComList.push({
        Com: res.data.fileConent.fileConent,
        name: item.name,
        code: item.code
      })
    }
    setDefineComList(defineComList)
  }

  /**
   * 遍历所有组件，判断组件类型，放到不同的分组里面
   * @level 3
   */
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

  useEffect(() => {
    getDefineComList()
  },[])

  /**
   * 从左侧拖拽节点的时候触发，拿到对应组件的数据结构，并且change当前拖拽的节点
   * @param {xinNode} Com 从左侧拖拽的组件
   * @param {string} cName 组件的基础类型，button，input
   * @param {string} groupType 组件的分组类型，容器，数据录入
   * @returns {function} changeTopCom，更改当前拖拽的节点
   * @level 4
   */
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
          {defineComList.map(item => {
            const Com = item.Com;
            const Icon = componentIconMap['XinCard']
            return  <div onDragStart={onDragStart(Com,item.code,'defineCom')} key={'item'} className='componentItem'>
              <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} /><span>{item.name}</span></div>
            </div>
          })}
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
