import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import './index.css'
import Store from '../../Store';
import _ from 'lodash'

export default function XinButton(props) {

  const {attributeValue,actionJs,styleCss,buttonType,size,disabled,danger,ghost} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)
  const [style,setStyle] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  const onClick = (e) => {
    if(!disabled){
      let script = document.createElement('script');
      script.innerHTML = '(function(){' +  actionJs?.click + '})()'
      document.body.append(script)
    }
  }

  return (
    <div id='componentButton'>
      <Button
        type={buttonType || 'primary'}
        onClick={onClick}
        size={size || 'default'}
        disabled={disabled}
        danger={danger}
        ghost={ghost}
        style={style}
      >
        {attributeValue || '默认按钮'}
      </Button>
    </div>
  )
}
