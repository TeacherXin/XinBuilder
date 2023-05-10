import React, { useEffect, useState } from 'react'
import './index.css'
import {Modal,Typography } from 'antd'
const { Paragraph } = Typography;

export default function EditAction(props) {
  const {showJson,nowCom, setShowJson} = props

  const submitJson = (flag) => {
    return () => {
      setShowJson(flag)
    }
  }

  return (
    <Modal
      open={showJson}
      className='editStyle'
      onOk={submitJson(false)}
      onCancel={submitJson(false)}
      bodyStyle={{width:"800px",height:"400px"}}
      closable={false}
    >
      <Paragraph
        style={{
          maxWidth: 440,
          marginTop: 24,
        }}
      >
        <pre
          style={{
            border: 'none',
            height:'370px',
            width:'450px',
            overflow:'auto'
          }}
        >
          {JSON.stringify(nowCom, null, 2)}
        </pre>
      </Paragraph>
    </Modal>
  )
}
