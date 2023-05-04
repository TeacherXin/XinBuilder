import React, { useEffect } from 'react'
import './index.css'
import {Modal} from 'antd'
export default function EditStyle(props) {
  const {changeStyleCss,submitStyle,styleCss,showStyle} = props

  return (
    <Modal
      open={showStyle}
      className='editStyle'
      onOk={submitStyle(true)}
      onCancel={submitStyle(false)}
      bodyStyle={{width:"800px",height:"400px"}}
    >
      <textarea className='textarea' onChange={changeStyleCss} value={styleCss || ''}></textarea>
    </Modal>
  )
}
