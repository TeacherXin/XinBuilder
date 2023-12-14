import React from 'react'
import {Modal} from 'antd'
import KeyWord from './keyWord'

export default function EditKeyAction(props) {
  const {showEditAction, setShowEditAction, comId} = props
  const onCancel = () => {
    setShowEditAction(false)
  }

  return (
    <div>
      <Modal
        open={showEditAction}
        width={800}
        onCancel={onCancel}
        footer={null}
      >
        <KeyWord comId={comId}/>
      </Modal>
    </div>
  )
}
