import React, { useEffect, useState } from 'react'
import './index.css'

export default function Input(props) {

  const [value,setValue] = useState('');
  const {attributeValue,onClick,onContextMenu} = props
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  return (
    <div >
      <input 
        className='componentInput'
        onContextMenu={onContextMenu}
        onClick={onClick} value={value}
        onChange={onChange}
      />
    </div>
  )
}
