import React, { useEffect, useState } from 'react'
import './index.css'


export default function EditAction(props) {
  const {changeActionJs,submitAction,actionJs,showAction,actionName} = props

  return (
    <div style={{display: showAction ? 'block' : 'none'}} className='editAction'>
      <textarea className='textarea' onChange={changeActionJs} value={actionJs?.[actionName] || ''}></textarea>
      <div className='actinFooter'>
        <button onClick={submitAction(false)}>取消</button>
        <button onClick={submitAction(true)}>确定</button>
      </div>
  </div>
  )
}