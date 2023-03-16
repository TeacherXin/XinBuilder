import React, { useEffect, useState } from 'react'

export default function Input(props) {

  const [value,setValue] = useState('');
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  return (
    <div >
      <input value={value} onChange={onChange}></input>
    </div>
  )
}
