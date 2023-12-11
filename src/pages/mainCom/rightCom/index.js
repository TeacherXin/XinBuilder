import React, {  useState } from 'react'
import './index.css'
import Store from '../../../store';
import _ from 'lodash'
import subscribeHook from '../../../component/subscribe';
import SetColumns from '../../../modal/setColumns';
import SetTableData from '../../../modal/setTableData';
import SetIcon from '../../../modal/setIcon';
import SetMaterial from '../../../modal/editMaterial'
import { Select, Input, Switch, Button } from 'antd';
import {RightOutlined, LeftOutlined} from '@ant-design/icons'
import attributeValueMap from './util/attributeValueMap';


export default function RightCom(props) {

  const {rightPanel,comId} = props;
  const [showSetColumns,setShowSetColumns] = useState(false)
  const [showSetTableData,setShowTableData] = useState(false)
  const [showIcon, setShowIcon] = useState(false)
  const [showMaterial, setShowMaterial] = useState(false)
  const attributeMapRight = _.cloneDeep(Store.getState().attributeMap)
  // eslint-disable-next-line no-unused-vars
  const [update,setUpdate] = useState({})
  const [showRightPanel,setShowRightPanel] = useState(true)

  subscribeHook(() => {
    setUpdate({})
  })

  const getAttributeValueCom = (item,index) => {
    // 处理扩展组件
    if(Array.isArray(item)) {
      item = item[0]
    }
    switch (item) {
      case 'disabled': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'centered': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'animated': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'autoplay': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'showHeader': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'bordered': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'allowHalf': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'visible': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={true}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'showTime': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={true}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'labelAlign': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'right'}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'right'}
          options={
          [
            { label: '左侧', value: 'left' },
            { label: '右侧', value: 'right' }
          ]
        } />
      }
      case 'tabPosition': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'top'}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'top'}
          options={
          [
            { label: '左侧', value: 'left' },
            { label: '右侧', value: 'right' },
            { label: '头部', value: 'top' },
            { label: '底部', value: 'bottom' },
          ]
        } />
      }
      case 'tabsType': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'line'}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'line'}
          options={
          [
            { label: '线条', value: 'line' },
            { label: '卡片', value: 'card' }
          ]
        } />
      }
      case 'optionType': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'default'}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'default'}
          options={
          [
            { label: '默认', value: 'default' },
            { label: '按钮', value: 'button' }
          ]
        } />
      }
      case 'shape': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'circle'}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'circle'}
          options={
          [
            { label: '圆形', value: 'circle' },
            { label: '方形', value: 'square' }
          ]
        } />
      }
      case 'buttonStyle': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'outline '}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'outline '}
          options={
          [
            { label: '虚线', value: 'outline ' },
            { label: '实线', value: 'solid' }
          ]
        } />
      }
      case 'picker': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'date'}
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'date'}
          options={
          [
            { label: '日期', value: 'date' },
            { label: '周份', value: 'week' },
            { label: '月份', value: 'month' },
            { label: '季度', value: 'quarter' },
            { label: '年份', value: 'year' }

          ]
        } />
      }
      case 'checked': {
        return <Switch 
        style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'colon': {
        return <Switch 
        style={{ marginRight:'70px'}}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] === undefined ? true : window.findNodeByComId(comId,attributeMapRight)?.[item]}
        />
      }
      case 'danger': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'required': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'ghost': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'allowClear': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'showCount': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={window.findNodeByComId(comId,attributeMapRight)?.[item] || false}
        />
      }
      case 'buttonType': {
        return <Select 
          style={{ width: 120,height: 20 }}
          defaultValue='primary'
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'primary'}
          options={
          [
            { label: '默认按钮', value: 'primary' },
            { label: '虚线按钮', value: 'dashed' },
            { label: '文本按钮', value: 'text' },
            { label: '链接按钮', value: 'link' }
          ]
        } />
      }
      case 'size': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue='default'
          onChange={onChange(item)}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'default'}
          options={
          [
            { label: '大', value: 'large' },
            { label: '小', value: 'small' },
            { label: '中', value: 'default' },
          ]
        } />
      }
      case 'layout': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'horizontal'}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'horizontal'}
          onChange={onChange(item)}
          options={
          [
            { label: '水平', value: 'horizontal' },
            { label: '竖直', value: 'vertical' }
          ]
        } />
      }
      case 'mode': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'vertical'}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'vertical'}
          onChange={onChange(item)}
          options={
          [
            { label: '水平', value: 'horizontal' },
            { label: '竖直', value: 'vertical' },
            { label: '内嵌', value: 'inline' }
          ]
        } />
      }
      case 'inputType': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'text'}
          value={window.findNodeByComId(comId,attributeMapRight)?.[item] || 'text'}
          onChange={onChange(item)}
          options={
          [
            { label: '文本框', value: 'text' },
            { label: '搜索框', value: 'Search' },
            { label: '密码框', value: 'Password' },
            { label: '大文本框', value: 'TextArea'}
          ]
        } />
      }
      case 'setColumns': {
        return <Button onClick={() => {setShowSetColumns(true)}} style={{width:'130px',position: 'relative',bottom: '5px',left:'20px'}}>设置表头</Button>
      }
      case 'setTableData': {
        return <Button onClick={() => {setShowTableData(true)}} style={{width:'130px',position: 'relative',bottom: '5px',left:'20px'}}>设置内容</Button>
      }
      case 'setIcon': {
        return <Button onClick={() => {setShowIcon(true)}} style={{width:'120px',position: 'relative',bottom: '5px'}}>选择图标</Button>
      }
      case 'setMaterial': {
        return <Button onClick={() => {setShowMaterial(true)}} style={{width:'120px',position: 'relative',bottom: '5px'}}>配置材质</Button>
      }
      case 'attributeValueNumber': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      case 'count': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      case 'step': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      case 'max': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      case 'min': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      case 'rotate': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      case 'tabBarGutter': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
      //样式相关的组件
      case 'fontSize': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'width': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'height': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'maxWidth': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'maxHeight': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'marginLeft': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'marginTop': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'lineHeight': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item,true)} value={parseInt(JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item]) || ''}></Input>
      }
      case 'color': {
        return <Input style={{ width: 120, height: 30 }} key={index} onChange={onChange(item, true)} value={JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item] || ''}></Input>
      }
      case 'backgroundColor': {
        return <Input style={{ width: 120, height: 30 }} key={index} onChange={onChange(item, true)} value={JSON.parse(window.findNodeByComId(comId,attributeMapRight)?.styleCss || '{}')?.[item] || ''}></Input>
      }
      default: {
        return <Input style={{ width: 120, height: 30 }} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
    }
  }

  const onChange = (name, isStyle) => {
    return (value) => {
      if(typeof value === 'object'){
        value = value.target.value
      }
      const node = window.findNodeByComId(comId,attributeMapRight,attributeMapRight)
      if(isStyle) {
        changeStyle(node, name, value)
      }else {
        node[name] = value;
      }
      Store.dispatch({type:'change',attributeMap: attributeMapRight})
    }
  }

  const changeStyle = (node, name, value) => {
    if(['fontSize', 'width', 'height','marginLeft','marginTop'].includes(name)) {
      if(!node.styleCss) {
        node.styleCss = {}
      }else{
        node.styleCss = JSON.parse(node.styleCss)
      }
      node.styleCss[name] = value + 'px';
      node.styleCss = JSON.stringify(node.styleCss)
    }else {
      if(!node.styleCss) {
        node.styleCss = {}
      }else{
        node.styleCss = JSON.parse(node.styleCss)
      }
      node.styleCss[name] = value;
      node.styleCss = JSON.stringify(node.styleCss)
    }
  }

  return (
    showRightPanel? <div className='rightCom'>
      <SetColumns comId={comId} setShowSetColumns={setShowSetColumns} showSetColumns={showSetColumns} />
      <SetTableData comId={comId} setShowTableData={setShowTableData} showSetTableData={showSetTableData} />
      <SetIcon comId={comId} showIcon={showIcon} setShowIcon={setShowIcon} />
      <SetMaterial comId={comId} showMaterial={showMaterial} setShowMaterial={setShowMaterial}/>
      <div>
        <RightOutlined onClick={() => {setShowRightPanel(false)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer',marginRight:'10px'}} />
        <div style={{height:'30px'}}><span style={{fontWeight:'bold'}}>{comId}</span></div>
        <hr></hr>
        {
          (rightPanel[comId] || []).map((item,index) => {
            return <div key={index} className='attributeItem'>
              <label>{attributeValueMap[item] || item[1]}</label>
              <div className='attributeItemValue'>
                {getAttributeValueCom(item,index)}
              </div>
            </div>
          })
        }
      </div>
    </div> : <LeftOutlined onClick={() => {setShowRightPanel(true)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer'}} />
  )
}
