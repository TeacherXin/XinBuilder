import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store'
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe'
import { Tree } from 'antd';

export default function LeftList(props) {

  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})

  subscribeHook(() => {
    setUpdate({})
  })

  const getTreeData = (attributeMap) => {
    let treeData = []
    for(let propName in attributeMap){
      treeData.push({
        title: <div style={{height:'40px'}}>{propName}</div>,
        key: attributeMap[propName].comId,
        children: getTreeData(attributeMap[propName].childList)
      })
    }
    return treeData
  }

  return (
    <div className='leftList'>
      <Tree
        showLine={true}
        treeData={getTreeData(attributeMap)}
        style={{background:'linear-gradient(rgb(234 213 210),rgb(236 235 202) ,#dbf0c7)'}}
      />

    </div>
  )
}
