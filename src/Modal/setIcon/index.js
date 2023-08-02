import React, { useEffect, useState } from 'react'
import './index.css'
import {Modal} from 'antd'
import iconList from './antdIcon'
import Store from '../../Store'
import _ from 'lodash'

export default function SetIcon(props) {
  const {showIcon, setShowIcon, comId} = props
  const [list, setList] = useState([])
  const [selectName, setSelectName] = useState('')
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  useEffect(() => {
    setList(iconList)
  },[])

  useEffect(() => {
    const node = window.findNodeByComId(comId,attributeMap);
    if(node?.iconType){
      setSelectName(node.iconType)
    }
  },[])

  const selectIcon = (name) => {
    return () => {
      setSelectName(name)
    }
  }

  const submitIcon = () => {
    const node = window.findNodeByComId(comId,attributeMap);
    node.iconType = selectName;
    Store.dispatch({type:'change',attributeMap})
    setShowIcon(false)
  }

  return (
    <Modal
      open={showIcon}
      className='setIcon'
      onOk={submitIcon}
      width={600}
      onCancel={() => {setShowIcon(false)}}
      closable={false}
    >
      <div className='listMap'>
        {
          list.map(name => {
            let Ctor = require('@ant-design/icons')[name]
            return <div key={name} onClick={selectIcon(name)} className={selectName === name ? 'activeItem':'IconItem'}>
              <Ctor />
            </div>
          })
        }
      </div>
    </Modal>
  )
}
