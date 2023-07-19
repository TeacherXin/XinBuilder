import React, { useEffect, useState } from 'react'
import { InputNumber,message } from 'antd'
import Store from '../../Store';
import _ from 'lodash'

export default function XinNumber(props) {

  const [value,setValue] = useState('');
  const [style,setSyle] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const {attributeValueNumber,styleCss,actionJs,placeholder,size,prefix,showCount,comId,visible,max,min,step} = props
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
    setSyle(style)
  },[styleCss])

  const onChange = (value) =>{
    setValue(value);
    window.findNodeByComId(comId,attributeMap).attributeValue = value;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.change);
    changeFun(value)
  }

  useEffect(() => {
    setValue(attributeValueNumber)
  },[attributeValueNumber])

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <InputNumber
        size={size}
        prefix={prefix}
        showCount={showCount}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        max={max}
        min={min}
        step={step}
      />
    </div>
  )
}
