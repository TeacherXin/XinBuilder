import React, { useState } from 'react'

export default function Label() {

  const [value,setValue] = useState('标签')
  return (
    <div>
      <span>{value}</span>
    </div>
  )
}
