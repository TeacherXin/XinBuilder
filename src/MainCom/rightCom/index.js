import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store';
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe';

const attributeValueMap = {
  attributeValue: '属性值',
  size: '大小',
  disable: '是否禁用',
  type: '类型',
  prefix: '前缀',
  suffix: '后缀',
  placeholder: '默认提示',
  url: 'URL地址',
  openType: '新页签打开',
  listItemNum: '子元素',
  title: '标题'
}


export default function RightCom(props) {

  const {rightPanel,comId} = props;
  const attributeMapRight = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})

  subscribeHook(() => {
    setUpdate({})
  })

  const getAttributeValueCom = (item,index) => {
    switch (item) {
      case 'size': {
        return <select onChange={onChange(item)}>
          <option value='lg'>大</option>
          <option value='md' selected>中</option>
          <option value='sm'>小</option>
        </select>
      }
      case 'type': {
        return <select onChange={onChange(item)}>
          <option value='text' selected>输入框</option>
          <option value='radio'>单选按钮</option>
          <option value='checkbox'>多选按钮</option>
          <option value='search'>搜索框</option>
          <option value='number'>数值框</option>
          <option value='date'>日期框</option>
        </select>
      }
      case 'disable','openType': {
        return <select onChange={onChange(item)}>
          <option value={false}>是</option>
          <option value={true} selected>否</option>
        </select>
      }
      case 'listItemNum': {
        return <input type={'number'} key={index} onChange={onChange(item)} value={attributeMapRight?.[comId]?.[item] || ''}></input>
      }
      default: {
        return <input key={index} onChange={onChange(item)} value={attributeMapRight?.[comId]?.[item] || ''}></input>
      }
    }
  }

  const onChange = (name) => {
    return (e) => {
      if(!attributeMapRight[comId]){
        attributeMapRight[comId] = {}
      }
      attributeMapRight[comId][name] = e.target.value;
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
