import React, { useEffect, useState } from 'react'
import './index.css'
import { Input,message } from 'antd'
import Store from '../../Store';
import _ from 'lodash'
export default function XinInput(props) {

  const [value,setValue] = useState('');
  const [style,setSyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const [InputComponent, setInputComponent] = useState(Input)
  const {attributeValue,styleCss,actionJs,addonBefore,addonAfter,placeholder,size,prefix,suffix,allowClear,showCount,comId,visible,inputType} = props
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

  useEffect(() => {
    if(props.inputType === 'text'){
      setInputComponent(Input)
    }else if(props.inputType === 'Search'){
      setInputComponent(Input.Search)
    }else if(props.inputType === 'Password'){
      setInputComponent(Input.Password)
    }else if(props.inputType === 'TextArea'){
      setInputComponent(Input.TextArea)
    }
  },[props.inputType])

  const onChange = (e) =>{
    setValue(e.target.value);
    window.findNodeByComId(comId,attributeMap).attributeValue = e.target.value;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.change);
    changeFun(e)
  }

  useEffect(() => {
    setValue(attributeValue)
  },[attributeValue])

  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  return (
    <div style={{display: visible ? 'none':'block'}} className='componentInput'>
      {contextHolder}
      <InputComponent
        size={size}
        prefix={prefix}
        suffix={suffix}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        allowClear={allowClear}
        showCount={showCount}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
    </div>
  )
}
