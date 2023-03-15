import React, { useEffect, useState } from 'react'

export default function Button(props) {
  const [style] = useState({width: '60px',height:'30px'})
  const setChildStyle = props.setChildStyle;

  useEffect(() => {
    if(setChildStyle){
      setChildStyle(style)
    }
  },[style,setChildStyle])

  return (
    <div>
      <button style={style}>按钮</button>
    </div>
  )
}
