import React, { useState,useEffect } from 'react'
import { Radio,message } from 'antd'
import Store from '../../store';
import _ from 'lodash'

export default function XinRadio(props) {
  const {attributeValue,actionJs,styleCss,disabled,checked,comId,visible} = props
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {};
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {};
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  const onClick = (e) => {
    window.findNodeByComId(comId,attributeMap).checked = !window.findNodeByComId(comId,attributeMap)?.checked;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.click);
    changeFun(e)
  }
  const onChange = (e) =>{
    window.findNodeByComId(comId,attributeMap).checked = !window.findNodeByComId(comId,attributeMap)?.checked;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.change);
    changeFun(e)
  }
  
  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <Radio
        checked={checked}
        disabled={disabled}
        style={style}
        onClick={onClick}
        onChange={onChange}
        value={comId}
      >
        {attributeValue || 'Radio'}
      </Radio>
    </div>
  )
}
