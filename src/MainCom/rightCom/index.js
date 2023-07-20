import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store';
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe';
import SetColumns from '../../Modal/setColumns';
import SetTableData from '../../Modal/setTableData';
import { Select, Input, Switch, Button } from 'antd';
import {RightOutlined, LeftOutlined} from '@ant-design/icons'

const attributeValueMap = {
  attributeValue: '属性值',
  size: '大小',
  disabled: '是否禁用',
  addonBefore: '前置标签',
  addonAfter: '后置标签',
  placeholder: '默认提示',
  url: 'URL地址',
  openType: '新页签打开',
  listItemNum: '子元素',
  title: '标题',
  buttonType: '按钮类型',
  size: '组件大小',
  danger: '危险按钮',
  ghost: '幽灵按钮',
  prefix: '前缀',
  suffix: '后缀',
  allowClear: '允许清除',
  showCount: '展示字数',
  checked: '是否选中',
  label: '标签',
  layout: '布局',
  required: '必填',
  requiredMessage: '必填提示',
  colon: '标题冒号',
  labelAlign: '标题对齐方式',
  iconType: '图标类型',
  twoToneColor: '主题色',
  rotate: '旋转角度',
  mode: '菜单类型',
  visible: '隐藏',
  picker: '日期类型',
  showTime: '展示时间',
  dateFormat: '日期格式',
  attributeValueNumber: '属性值',
  max: '最大值',
  min: '最小值',
  step: '步数大小',
  optionType: '单选类型',
  buttonStyle: '按钮风格',
  selectedID: '选中节点ID',
  allowHalf: '允许半选',
  count: 'star总数',
  disabled: '禁用',
  bordered: '边框',
  setColumns: '表头字段',
  setTableData: '表格内容',
  showHeader: '禁用表头',
  selectedKey: '选中菜单key',
  pageUrl: '页面ID',
  autoplay: '自动切换',
  src: '资源地址',
  shape: '形状',
  activeKey: '当前key',
  animated: '开启动画',
  centered: '标签居中',
  tabBarGutter: '页签间隙',
  tabPosition: '页签位置',
  tabsType: '页签样式'
}


export default function RightCom(props) {

  const {rightPanel,comId} = props;
  const [showSetColumns,setShowSetColumns] = useState(false)
  const [showSetTableData,setShowTableData] = useState(false)
  const attributeMapRight = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})
  const [showRightPanel,setShowRightPanel] = useState(true)

  subscribeHook(() => {
    setUpdate({})
  })

  const getAttributeValueCom = (item,index) => {
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
      case 'setColumns': {
        return <Button onClick={() => {setShowSetColumns(true)}} style={{width:'130px',position: 'relative',bottom: '5px',left:'20px'}}>设置表头</Button>
      }
      case 'setTableData': {
        return <Button onClick={() => {setShowTableData(true)}} style={{width:'130px',position: 'relative',bottom: '5px',left:'20px'}}>设置内容</Button>
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
      default: {
        return <Input style={{ width: 120, height: 30 }} key={index} onChange={onChange(item)} value={window.findNodeByComId(comId,attributeMapRight)?.[item] || ''}></Input>
      }
    }
  }

  const onChange = (name) => {
    return (value) => {
      if(typeof value === 'object'){
        value = value.target.value
      }
      const node = window.findNodeByComId(comId,attributeMapRight,attributeMapRight)
      node[name] = value;
      Store.dispatch({type:'change',attributeMap: attributeMapRight})
    }
  }

  return (
    showRightPanel? <div className='rightCom'>
      <SetColumns comId={comId} setShowSetColumns={setShowSetColumns} showSetColumns={showSetColumns} />
      <SetTableData comId={comId} setShowTableData={setShowTableData} showSetTableData={showSetTableData} />
      <div>
        <RightOutlined onClick={() => {setShowRightPanel(false)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer',marginRight:'10px'}} />
        <div style={{height:'30px'}}><span style={{fontWeight:'bold'}}>{comId}</span></div>
        <hr></hr>
        {
          (rightPanel[comId] || []).map((item,index) => {
            return <div key={index} className='attributeItem'>
              <label>{attributeValueMap[item]}</label>
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
