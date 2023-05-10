import React, { useEffect, useState } from 'react'
import './index.css'
import {Modal,Typography } from 'antd'
const { Paragraph } = Typography;

export default function EditAction(props) {
  const {showJson,nowCom, setShowJson} = props

  const submitJson = () => {
    setShowJson(false)
  }

  return (
    <Modal
      open={showJson}
      className='editStyle'
      onOk={submitJson}
      // onCancel={submitAction(false)}
      bodyStyle={{width:"800px",height:"400px"}}
      closable={false}
    >
      <Paragraph
        style={{
          maxWidth: 440,
          marginTop: 24,
        }}
        editable={{
          onEnd(e){
            console.log(window.aaaa)
          },
          onChange(value){
            window.aaaa = value
          }
        }}
      >
        <pre
          style={{
            border: 'none',
            height:'350px',
            overflow:'auto'
          }}
        >
          {JSON.stringify(nowCom, null, 2)}
        </pre>
      </Paragraph>
    </Modal>
  )
}
