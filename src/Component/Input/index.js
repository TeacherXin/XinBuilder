import React, { useEffect, useState } from 'react'

export default function Input(props) {

  const [value,setValue] = useState('');
  const {attributeValue,onClick,className,onContextMenu} = props
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  return (
    <div >
      <input onContextMenu={onContextMenu} onClick={onClick} className={className} value={value} onChange={onChange}></input>
    </div>
  )
}
