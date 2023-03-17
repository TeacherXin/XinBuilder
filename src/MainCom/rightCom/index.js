import React, { useEffect, useState } from 'react'
import './index.css'

export default function RightCom(props) {

  const {rightPanel,setRightAttributeMap,comId,atrributeMapRight} = props;

  const attributeMap = {}

  const onChange = (name) => {
    return (e) => {
      attributeMap[name] = e.target.value;
      setRightAttributeMap({...attributeMap},comId);
    }
  }

  return (
    <div className='rightCom'>
      {
        (rightPanel[comId] || []).map((item,index) => {
          return <div key={index} className='attributeItem'>
            <label>{item}</label>
            <input key={index} onChange={onChange(item)} value={atrributeMapRight?.[comId]?.[item] || ''}></input>
          </div>
        })
      }
    </div>
  )
}
