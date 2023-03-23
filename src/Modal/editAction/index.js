import React, { useEffect, useState } from 'react'
import './index.css'
import classnames from'classnames';


export default function EditAction(props) {
  const {changeActionJs,submitAction,actionJs,showAction} = props
  const actionList = ['click','change']
  const [selected, setSelected] = useState('click')


  const selectedItem = (item) => {
    return () => {
      setSelected(item)
    }
  }

  return (
    <div style={{display: showAction ? 'block' : 'none'}} className='editAction'>
      <div>
        {actionList.map(item => {
          const ifSelected = item === selected ? 'selected' : ''
          return <span onClick={selectedItem(item)} className={classnames(['tab',ifSelected])}>{item}</span>
        })}
      </div>
      <textarea className='textarea' onChange={changeActionJs(selected)} value={actionJs?.[selected] || ''}></textarea>
      <div className='actinFooter'>
        <button onClick={submitAction(false)}>取消</button>
        <button onClick={submitAction(true,selected)}>确定</button>
      </div>
  </div>
  )
}
