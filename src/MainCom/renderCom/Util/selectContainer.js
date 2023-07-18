import React, { useState } from 'react'
import { Modal, Select } from 'antd'
import Store from '../../../Store'
import _ from 'lodash'

export default function SelectContainer(props) {
  const {showSelectContainer,setShowSelectContainer,containerOptions,newCom} = props
  const [container,setContainer] = useState({})

  let attributeMap = _.cloneDeep(Store.getState().attributeMap);

  const options = containerOptions.map(item => {
    return {
      value: item.comId,
      label: item.comId
    }
  })

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

  const changeAttributeMap = (container,attributeMap) => {
    for(let propName in attributeMap){
      if(attributeMap[propName].comId === container.comId){
        attributeMap[propName] = container
      }else if(attributeMap[propName].childList){
        changeAttributeMap(container,attributeMap[propName].childList)
      }
    }
  }

  const onSelect = (e) => {
    setContainer(containerOptions.find(item => item.comId === e))
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
        <Select onSelect={onSelect} value={container?.comId} defaultValue={options[0]?.value} style={{width: 120}} options={options} />
      </Modal>
    </div>
  )
}
