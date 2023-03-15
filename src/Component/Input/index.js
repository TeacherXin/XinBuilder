import React, { useEffect, useState } from 'react'

export default function Input(props) {

  const [value,setValue] = useState('');
  const [style] = useState({width: '100px',height:'20px'})
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  return (
    <div >
      <input style={style} value={value} onChange={onChange}></input>
    </div>
  )
}
