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


  const menuOnClick = (com) =>{
    return (menuItem) => {
      if(menuItem.key === 'showJson'){
        setShowJson(true);
        setNowCom(com)
      }
    }
  }

  const getTreeData = (attributeMap) => {
    let treeData = []
    for(let propName in attributeMap){
      treeData.push({
        title: <div>
                <Dropdown menu={{onClick: menuOnClick(attributeMap[propName]), items }} trigger={['contextMenu']}>
                  <span>{propName}</span>
                </Dropdown>
              </div>,
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
        selectable={false}
        treeData={getTreeData(attributeMap)}
        style={{background:'linear-gradient(rgb(234 213 210),rgb(236 235 202) ,#dbf0c7)'}}
      />
      <EditJson setShowJson={setShowJson} nowCom={nowCom} showJson={showJson} />
    </div>
  )
}
