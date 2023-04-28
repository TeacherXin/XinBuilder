import React from 'react'
import { useLocation } from 'react-router-dom'
import * as myComponent from '../Component'

export default function MetaRender() {
  const state = useLocation().state;

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
            tableRes={state?.[item]?.tableData}
            attributeValue={state[item]?.attributeValue}
            styleCss={state[item]?.styleCss}
            actionJs={state[item]?.actionJs}
            size={state[item]?.size}
            disabled={state[item]?.disabled}
            addonBefore={state[item]?.addonBefore}
            addonAfter={state[item]?.addonAfter}
            placeholder={state[item]?.placeholder}
            url={state[item]?.url}
            openType={state[item]?.openType}
            listItemNum={state[item]?.listItemNum}
            title={state[item]?.title}
            buttonType={state[item]?.buttonType}
            danger={state[item]?.danger}
            ghost={state[item]?.ghost}
            prefix={state[item]?.prefix}
            suffix={state[item]?.suffix}
            allowClear={state[item]?.allowClear}
            showCount={state[item]?.showCount}
            />
        </div>
      })}
    </div>
  )
}
