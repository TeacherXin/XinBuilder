import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store'
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe'

export default function LeftList(props) {

  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})

  subscribeHook(() => {
    setUpdate({})
  })

  const showDownList = (attribute) => {
    return () => {
      attribute.showList = !attribute.showList;
      Store.dispatch({type: 'change',attributeMap});
      setUpdate({})
    }
  }

  const getComAttributeList = (name,attribute) => {
    if(typeof attribute === 'string' || typeof attribute === 'boolean'){
      return <div key={attribute} style={{marginTop: '10px'}}>
        <span style={{marginLeft: '30px'}}>{name}:</span>
        <span> {attribute.toString()}</span>
      </div>
    }else if(typeof attribute === 'object'){
      return <div style={{marginTop:'10px'}}>
        <span onClick={showDownList(attribute)} className='toDownicon'>{!attribute.showList?'+':'-'}</span><span>{name}:</span>
        {attribute.showList && <div style={{marginLeft: '40px'}}>
          {
            Object.keys(attribute).map(item => {
              return getComAttributeList(item,attribute[item])
            })
          }
        </div>}
      </div>
    }
  }

  return (
    <div className='leftList'>
      {Object.keys(attributeMap).map((item,index) => {
        return <div key={index} className='leftAttributeItem'>
          <p>{item}</p>
          {Object.keys(attributeMap[item]).map((_item,_index) => {
            return <div key={_index}>{getComAttributeList(_item,attributeMap[item][_item])}</div>
          })}
        </div>
      })}
    </div>
  )
}
