import React, { useEffect, useState } from 'react'

export default function Input(props) {

  const [value,setValue] = useState('');
  const [style] = useState({width: '100px',height:'20px'})
  const setChildStyle = props.setChildStyle;
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  useEffect(() => {
    if(setChildStyle){
      setChildStyle(style)
    }
  },[style,setChildStyle])

  return (
    <div >
      <input style={style} value={value} onChange={onChange}></input>
    </div>
  )
}
