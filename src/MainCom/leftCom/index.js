import React, { useEffect, useState } from 'react'
import './index.css'
import * as myComponent from '../../Component'
import LeftList from '../leftList'
import { Collapse } from 'antd';
import 
{
  RightOutlined,
  LeftOutlined,
  CreditCardOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
  GroupOutlined,
  TabletOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
  FrownOutlined,
  DoubleRightOutlined,
  FileTextOutlined,
  FieldNumberOutlined,
  TrademarkCircleOutlined,
  EditOutlined,
  CloudDownloadOutlined,
  TableOutlined,
  BoxPlotOutlined
} from '@ant-design/icons';

const componentIconMap = {
  XinCard: CreditCardOutlined,
  XinForm: FormOutlined,
  XinMenu: MenuUnfoldOutlined,
  XinRadioGroup: GroupOutlined,
  XinButton: TabletOutlined,
  XinCheckBox: CheckSquareOutlined,
  XinDatePicker: FieldTimeOutlined,
  XinIcon: FrownOutlined,
  XinInput: DoubleRightOutlined,
  XinLable: FileTextOutlined,
  XinNumber: FieldNumberOutlined,
  XinRadio: TrademarkCircleOutlined,
  XinRate: EditOutlined,
  XinUpload: CloudDownloadOutlined,
  XinTable: TableOutlined,
  XinFlex: BoxPlotOutlined
}

const componentTextMap = {
  XinCard: '卡片',
  XinForm: '表单',
  XinMenu: '菜单',
  XinRadioGroup: '单选栏',
  XinButton: '按钮',
  XinCheckBox: '多选按钮',
  XinDatePicker: '日期框',
  XinIcon: '图标',
  XinInput: '输入框',
  XinLable: '标签',
  XinNumber: '数值框',
  XinRadio: '单选框',
  XinRate: '评分',
  XinUpload: '图片上传',
  XinTable: '表格',
  XinFlex: 'Flex布局'
}

const { Panel } = Collapse;

export default function LeftCom(props) {

  const {changeTopCom} = props
  const [selected,setSelected] = useState(1)
  const [containerList,setContanerList] = useState([])
  const [controlList,setControlList] = useState([])
  const [showDataList,setShowDataList] = useState([])
  const [showLeftPanel,setShowLeftPanel] = useState(true)

  useEffect(() => {
    Object.keys(myComponent).forEach(item => {
      if(['XinForm','XinMenu','XinRadioGroup','XinCard','XinFlex'].includes(item)){
        containerList.push(item)
      }else if(['XinTable'].includes(item)){
        showDataList.push(item)
      }else{
        controlList.push(item)
      }
    })
    setContanerList([...containerList])
    setControlList([...controlList])
    setShowDataList([...showDataList])
  },[])

  const onDragStart = (Com,cName) =>{
    return () => {
      changeTopCom({component: Com, name: cName})
    }
  }


  return (
    showLeftPanel? <div className='leftCom'>
      <div className='Tab'>
        <p onClick={() => {setSelected(1)}} style={{background: selected === 2? 'rgb(240 203 203)':''}} className='TabItem'>组件</p>
        <p onClick={() => {setSelected(2)}} style={{background: selected === 1? 'rgb(240 203 203)':''}} className='TabItem'>
          数据
          <LeftOutlined onClick={() => {setShowLeftPanel(false)}} style={{color:'blue',cursor: 'pointer',position:'relative',left:'30px'}} />
        </p>
      </div>
      {
        selected === 1 ? <div className='componentList'>
        {
          <Collapse defaultActiveKey={['1']} style={{width:"100%",background:'none',height:'100%',overflow:'auto'}}>
            <Panel header="容器类型组件" key="1" style={{background:'none',height:'100%'}}>
              {containerList.map(cName => {
                const Com = myComponent[cName];
                const Icon = componentIconMap[cName]
                const name = componentTextMap[cName]
                return  <div onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
                  <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} />{name}</div>
              </div>
              })}
            </Panel>
            <Panel header="数据录入组件" key="2">
              {controlList.map(cName => {
                const Com = myComponent[cName];
                const Icon = componentIconMap[cName]
                const name = componentTextMap[cName]
                return  <div onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
                  <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} />{name}</div>
              </div>
              })}
            </Panel>
            <Panel header="数据展示组件" key="3">
              {showDataList.map(cName => {
                const Com = myComponent[cName];
                const Icon = componentIconMap[cName]
                const name = componentTextMap[cName]
                return  <div onDragStart={onDragStart(Com,cName)} key={cName} className='componentItem'>
                  <div style={{display: 'inline-block'}} draggable><Icon style={{marginRight:'10px'}} />{name}</div>
              </div>
              })}
            </Panel>
          </Collapse>
        }
      </div> : <LeftList />
      }
    </div> : <RightOutlined onClick={() => {setShowLeftPanel(true)}} style={{color:'blue',cursor: 'pointer'}} />
  )
}
