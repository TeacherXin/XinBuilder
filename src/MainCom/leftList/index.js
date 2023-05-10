import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store'
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe'
import { Tree } from 'antd';
import ContextMenu from './contextMenu'
import EditJson from '../../Modal/editJson'

export default function LeftList(props) {

  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})
  const [nowCom,setNowCom] = useState({})
  const [showJson, setShowJson] = useState(false)

  subscribeHook(() => {
    setUpdate({})
  })

  const onContextMenu = (item) => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      item.showListMenu = true;
      setNowCom(item)
      Store.dispatch({type: 'change',attributeMap})
    }
  }

  const clearAllShowListMenu = (e) => {
    Object.keys(attributeMap || {}).forEach(item => {
      attributeMap[item].showListMenu = false
      if(attributeMap[item].childList){
        (Object.keys(attributeMap[item].childList || {})).forEach(_item => {
          attributeMap[item].childList[_item].showListMenu = false
        })
      }
    })

    Store.dispatch({type:"change",attributeMap})
  }

  const getTreeData = (attributeMap) => {
    let treeData = []
    for(let propName in attributeMap){
      treeData.push({
        title: <div
          onContextMenu={onContextMenu(attributeMap[propName])}
          style={{height:'40px'}}>
            {
              <div><span>{propName}</span>
                <ContextMenu setShowJson={setShowJson} showListMenu={attributeMap[propName].showListMenu}/>
              </div>
            }
          </div>,
        key: attributeMap[propName].comId,
        children: getTreeData(attributeMap[propName].childList)
      })
    }
    return treeData
  }

  return (
    <div className='leftList' onClick={clearAllShowListMenu}>
      <Tree
        showLine={true}
        selectable={false}
        treeData={getTreeData(attributeMap)}
        style={{background:'linear-gradient(rgb(234 213 210),rgb(236 235 202) ,#dbf0c7)'}}
      />
      <EditJson setShowJson={setShowJson} nowCom={nowCom} showJson={showJson} />
    </div>
  )
}
