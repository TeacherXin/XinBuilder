import React, { useEffect, useState } from 'react'
import './index.css'
import {Modal} from 'antd'

export default function EditAction(props) {
  const {changeActionJs,submitAction,actionJs,showAction,actionName} = props

  return (
    <Modal
      open={showAction}
      className='editStyle'
      onOk={submitAction(true)}
      onCancel={submitAction(false)}
      bodyStyle={{width:"800px",height:"400px"}}
      closable={false}
    >
      <textarea className='textarea' onChange={changeActionJs} value={actionJs?.[actionName] || ''}></textarea>
    </Modal>
  )
}
