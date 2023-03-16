import React from 'react'
import './index.css'

export default function rightCom(props) {

  const {rightPanel} = props;
  return (
    <div className='rightCom'>
      {
        rightPanel.map(item => {
          return <div>
            {item}
          </div>
        })
      }
    </div>
  )
}
