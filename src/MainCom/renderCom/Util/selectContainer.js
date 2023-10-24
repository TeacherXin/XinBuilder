import React, { useEffect, useState } from 'react'
import { Modal, Select } from 'antd'
import Store from '../../../Store'
import _ from 'lodash'

export default function SelectContainer(props) {
  const {showSelectContainer,setShowSelectContainer,containerOptions,newCom} = props
  // 控制选择容器弹窗的展示
  const [container,setContainer] = useState({})

  let attributeMap = _.cloneDeep(Store.getState().attributeMap);

  const options = containerOptions.map(item => {
    return {
      value: item.comId,
      label: item.comId
    }
  })

  /**
   * 选择好容器，确定后触发。在该容器组件的childList，添加当前拖拽的节点
   * @level 3
   */
  const onOk = () => {
    delete newCom.style
    if(container.childList){
      container.childList[newCom.comId] = newCom
    }else{
      container.childList = {}
      container.childList[newCom.comId] = newCom
    }
    changeAttributeMap(container,attributeMap)
    Store.dispatch({type: 'change',attributeMap})
    setShowSelectContainer(false)
  }

  /**
   * 递归查找当前所有的容器节点
   * @param {Map} container 用来存放所有的容器节点
   * @param {Map} attributeMap 当前页面的所有节点集合
   * @level 3
   */
  const changeAttributeMap = (container,attributeMap) => {
    for(let propName in attributeMap){
      if(attributeMap[propName].comId === container.comId){
        attributeMap[propName] = container
      }else if(attributeMap[propName].childList){
        changeAttributeMap(container,attributeMap[propName].childList)
      }
    }
  }

  /**
   * 选中父容器的时候触发
   * @param {Event} e 当前选中的容器节点
   * @level 3
   */
  const onSelect = (e) => {
    const container = containerOptions.find(item => item.comId === e)
    setContainer({comId: e, ...container})
  }

  const onCancel = () => {
    setShowSelectContainer(false)
  }
  return (
    <div>
      <Modal
        open={showSelectContainer}
        onOk={onOk}
        onCancel={onCancel}
        closable={false}
      >
        <span>请选择父容器：</span>
        <Select onSelect={onSelect} value={container?.comId} style={{width: 120}} options={options} />
      </Modal>
    </div>
  )
}
