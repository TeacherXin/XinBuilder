import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store';
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe';
import { Select, Input } from 'antd';

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
  labelAlign: '标题对齐方式'
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
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
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
      case 'checked': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
      }
      case 'colon': {
        return <Select 
          style={{ width: 120,height: 25 }}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] === undefined ? true : findNodeByComId(comId)?.[item]}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
      }
      case 'danger': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
      }
      case 'required': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
      }
      case 'ghost': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
      }
      case 'allowClear': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
      }
      case 'showCount': {
        return <Select 
          style={{ width: 120,height: 25 }}
          defaultValue={false}
          onChange={onChange(item)}
          value={findNodeByComId(comId)?.[item] || false}
          options={
          [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        } />
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
      case 'listItemNum': {
        return <Input style={{ width: 120,height: 25 }} type={'number'} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
      default: {
        return <Input style={{ width: 120, height: 25 }} key={index} onChange={onChange(item)} value={findNodeByComId(comId)?.[item] || ''}></Input>
      }
    }
  }

  const onChange = (name) => {
    return (value) => {
      if(!attributeMapRight[comId]){
        for(let propName in attributeMapRight){
          if(attributeMapRight[propName].childList){
            if(attributeMapRight[propName].childList[comId])
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
