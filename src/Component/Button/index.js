import React, { useEffect, useState } from 'react'

export default function Button(props) {
  const [style] = useState({width: '60px',height:'30px'})
  return (
    <div>
      <button style={style}>按钮</button>
    </div>
  )
}
