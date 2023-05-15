import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store';
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe';
import { Select, Input, Switch } from 'antd';

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
  disabled: '禁用'
}


export default function RightCom(props) {

  const {rightPanel,comId} = props;
  const attributeMapRight = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})

  subscribeHook(() => {
    setUpdate({})
  })

  const findNodeByComId = (id) => {
    for(let propName in attributeMapRight){
      if(propName === id){
        return attributeMapRight[propName];
      }
      if(attributeMapRight[propName].childList){
        for(let _propName in attributeMapRight[propName].childList){
          if(_propName === id){
            return attributeMapRight[propName].childList[_propName]
          }
        }
      }
    }
  }

  const getAttributeValueCom = (item,index) => {
    switch (item) {
      case 'disabled': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'allowHalf': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'visible': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={true}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'showTime': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={true}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'labelAlign': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'right'}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || 'right'}
          options={
          [
            { label: '左侧', value: 'left' },
            { label: '右侧', value: 'right' }
          ]
        } />
      }
      case 'optionType': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'default'}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || 'default'}
          options={
          [
            { label: '默认', value: 'default' },
            { label: '按钮', value: 'button' }
          ]
        } />
      }
      case 'buttonStyle': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={'outline '}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || 'outline '}
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
          value={findNodeByComId(comId)?.[item] || 'date'}
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
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'colon': {
        return <Switch 
        style={{ marginRight:'70px'}}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] === undefined ? true : findNodeByComId(comId)?.[item]}
        />
      }
      case 'danger': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'required': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'ghost': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'allowClear': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'showCount': {
        return <Switch 
          style={{ marginRight:'70px'}}
          defaultValue={false}
          onChange={onChange(item)}
          checked={findNodeByComId(comId)?.[item] || false}
        />
      }
      case 'buttonType': {
        return <Select 
          style={{ width: 120,height: 20 }}
          defaultValue='primary'
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || 'primary'}
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
          value={findNodeByComId(comId)?.[item] || 'default'}
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
          value={findNodeByComId(comId)?.[item] || 'horizontal'}
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
          value={findNodeByComId(comId)?.[item] || 'vertical'}
          onChange={onChange(item)}
          options={
          [
            { label: '水平', value: 'horizontal' },
            { label: '竖直', value: 'vertical' },
            { label: '内嵌', value: 'inline' }
          ]
        } />
      }
      case 'attributeValueNumber': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      case 'count': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      case 'step': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      case 'max': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      case 'min': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      case 'rotate': {
        return <Input style={{ width: 120,height: 30 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      default: {
        return <Input style={{ width: 120, height: 30 }} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
    }
  }

  const onChange = (name) => {
    return (value) => {
      if(!attributeMapRight[comId]){
        for(let propName in attributeMapRight){
          if(attributeMapRight[propName].childList && attributeMapRight[propName].childList[comId]){
            if(typeof value === 'object'){
              value = value.target.value
            }
            attributeMapRight[propName].childList[comId][name] = value;
            Store.dispatch({type:'change',attributeMap: attributeMapRight})
            return;
          }
        }
      }
      if(typeof value === 'object'){
        value = value.target.value
      }
      attributeMapRight[comId][name] = value;
      Store.dispatch({type:'change',attributeMap: attributeMapRight})
    }
  }

  return (
    <div className='rightCom'>
      <div style={{marginTop:'40px'}}>
        {comId}
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
    </div>
  )
}
