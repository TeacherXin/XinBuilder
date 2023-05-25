import React, { useEffect, useState } from 'react'
import './index.css'
import Store from '../../Store'
import _ from 'lodash'
import subscribeHook from '../../DefineHook/subscribe'
import { Tree } from 'antd';
import EditJson from '../../Modal/editJson'
import { Dropdown, theme } from 'antd';

const items = [
  {
    label: '查看JSON',
    key: 'showJson'
  },
  {
    label: '删除节点',
    key: 'deleteNode'
  }
]

export default function LeftList(props) {

  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const [update,setUpdate] = useState({})
  const [nowCom,setNowCom] = useState({})
  const [showJson, setShowJson] = useState(false)

  subscribeHook(() => {
    setUpdate({})
  })

  
  const findNodeByComId = (id) => {
    for(let propName in attributeMap){
      if(propName === id){
        return attributeMap[propName];
      }
      if(attributeMap[propName].childList){
        for(let _propName in attributeMap[propName].childList){
          if(_propName === id){
            return attributeMap[propName].childList[_propName]
          }
        }
      }
    }
  }


  const menuOnClick = (com,parentId) =>{
    return (menuItem) => {
      if(menuItem.key === 'showJson'){
        setShowJson(true);
        setNowCom(com)
      }
      if(menuItem.key === 'deleteNode'){
        if(parentId){
          const node = findNodeByComId(parentId);
          let childList = node.childList;
          delete childList[com.comId]
        }else{
          delete attributeMap[com.comId]
        }
      }
      Store.dispatch({type:'change',attributeMap})
    }
  }

  const getTreeData = (attributeMap,parentId) => {
    let treeData = []
    for(let propName in attributeMap){
      treeData.push({
        title: <div>
                <Dropdown menu={{onClick: menuOnClick(attributeMap[propName],parentId), items }} trigger={['contextMenu']}>
                  <span>{propName}</span>
                </Dropdown>
              </div>,
        key: attributeMap[propName].comId,
        children: getTreeData(attributeMap[propName].childList,attributeMap[propName].comId)
      })
    }
    return treeData
  }

  return (
    <div className='leftList'>
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
