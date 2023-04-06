import React, { useState } from 'react'
import './index.css'

export default function LeftList(props) {

  const {atrributeMap} = props
  const [refresh,setRefresh] = useState(false)

  const showDownList = (attribute) => {
    return () => {
      attribute.showList = !attribute.showList;
      setRefresh(!refresh)
    }
  }

  const getComAttributeList = (name,attribute) => {
    console.log(refresh);
    if(typeof attribute === 'string'){
      return <div style={{marginTop: '10px'}}>
        <span style={{marginLeft: '30px'}}>{name}:</span>
        <span>{attribute}</span>
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
      {Object.keys(atrributeMap).map(item => {
        return <div className='leftAttributeItem'>
          <p>{item}</p>
          {Object.keys(atrributeMap[item]).map(_item => {
            return getComAttributeList(_item,atrributeMap[item][_item])
          })}
        </div>
      })}
    </div>
  )
}
