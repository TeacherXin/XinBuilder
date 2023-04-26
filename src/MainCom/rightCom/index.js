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
              <br></br>
              <input key={index} onChange={onChange(item)} value={attributeMapRight?.[comId]?.[item] || ''}></input>
            </div>
          })
        }
      </div>
    </div>
  )
}
