import React, { useEffect, useState } from 'react'

export default function Button(props) {

  const [value, setValue] = useState('按钮')

  return (
    <div>
      <button>{value}</button>
    </div>
  )
}
