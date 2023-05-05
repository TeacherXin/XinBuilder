import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as myComponent from '../Component'
import subscribeHook from '../DefineHook/subscribe'

export default function MetaRender() {
  const state = useLocation().state;
  const [update,setUpdate] = useState()

  subscribeHook(() => {
    setUpdate({})
  })

  return (
    <div>
      {Object.keys(state).map((item,index) => {
        const Com = myComponent[state[item].comType];
        const style = {
          position: 'absolute',
          left: state[item].position.left,
          top: state[item].position.top,
        }
        return <div key={index} id={item} style={style}>
          <Com
            renderFlag={true}
            onClick={()=>{}}
            {...state?.[item]}
            />
        </div>
      })}
    </div>
  )
}
