import React from 'react'
import { useLocation } from 'react-router-dom'
import * as myComponent from '../Component'

export default function MetaRender() {
  const state = useLocation().state;

  return (
    <div>
      {Object.keys(state).map(item => {
        const Com = myComponent[state[item].comType];
        const style = {
          position: 'absolute',
          left: state[item].position.left,
          top: state[item].position.top,
        }
        return <div id={item} style={style}>
          <Com renderFlag={true} onClick={()=>{}} tableRes={state?.[item]?.tableData} attributeValue={state[item]?.attributeValue} styleCss={state[item]?.styleCss} actionJs={state[item]?.actionJs}/>
        </div>
      })}
    </div>
  )
}
