import React, {  useState } from 'react'
import './index.css'
import Store from '../../../store'
import _ from 'lodash'
import subscribeHook from '../../../component/subscribe'
import { Tree } from 'antd';
import EditJson from '../../../modal/editJson'
import { Dropdown } from 'antd';
import {COMADAPTER} from '../renderCom/util/attributeMenu';

const items = [
  {
    label: '查看JSON',
    key: 'showJson'
  },
  {
    label: '删除节点',
    key: 'deleteNode'
  },
  {
    label: '设置属性',
    key: 'setAttribute'
  }
]

export default function LeftList(props) {
  const { changeRightPanel } = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  // redux更新时，更新当前组件
  const [update,setUpdate] = useState({})
  // 拿到当前选中的节点，传给EditJson组件
  const [nowCom,setNowCom] = useState({})
  // 是否展示Json展示弹窗
  const [showJson, setShowJson] = useState(false)

  subscribeHook(() => {
    setUpdate({})
  })

  /**
   * 右键Item的菜单点击事件，可以查看JSON，可以删除节点
   * @param {xinNode} com 当前选中的节点
   * @param {string} parentId 当前选中节点的父节点Id，用于删除节点使用
   * @level 3
   */
  const menuOnClick = (com,parentId) =>{
    return (menuItem) => {
      if(menuItem.key === 'showJson'){
        setShowJson(true);
        setNowCom(com)
      }
      if(menuItem.key === 'deleteNode'){
        if(parentId){
          const node = window.findNodeByComId(parentId,attributeMap);
          let childList = node.childList;
          delete childList[com.comId]
        }else{
          delete attributeMap[com.comId]
        }
      }
      if(menuItem.key === 'setAttribute') {
        changeRightPanel(COMADAPTER[com.comType],com.comId)
      }
      Store.dispatch({type:'change',attributeMap})
    }
  }

  /**
   * 通过xinCtx，构建左侧TreeList
   * @param {Object} attributeMap 表示同级的元素列表
   * @param {string} parentId 所有同级元素的父节点
   * @level 3
   */
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
      />
      <EditJson setShowJson={setShowJson} nowCom={nowCom} showJson={showJson} />
    </div>
  )
}
