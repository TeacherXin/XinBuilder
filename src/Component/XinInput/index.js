import React, { useEffect, useState } from 'react'
import './index.css'
import { Input,message } from 'antd'
import Store from '../../Store';
import _ from 'lodash'
export default function XinInput(props) {

  //input组件的值
  const [value,setValue] = useState('');
  //input组件的样式
  const [style,setSyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  //input组件的类型，例如InputPassword
  const [InputComponent, setInputComponent] = useState(Input)
  const {attributeValue,styleCss,actionJs,addonBefore,addonAfter,placeholder,size,prefix,suffix,allowClear,showCount,comId,visible,inputType} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  /**
   * 当配置好样式后，更新input组件的style
   * @level 3
   */
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

  /**
   * 当更改input组件的类型时，更新InputComponent
   * @level 3
   */
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

  /**
   * 当通过右侧属性面板更新input框的值是，也要更新input自己的值
   * @level 3
   */
  
  useEffect(() => {
    setValue(attributeValue)
  },[attributeValue])

  /**
   * 当配置好样式后，更新input组件的style
   * 可删除！！！！
   */
  useEffect(() => {
    let css = document.createElement('style');
    css.innerHTML = styleCss;
    document.body.append(css)
  },[styleCss])

  /**
   * input组件的onchange事件，更改后，也要更改对应组件的属性值
   * @param {*} e 事件对象
   * @level 3
   */
  const onChange = (e) =>{
    setValue(e.target.value);
    window.findNodeByComId(comId,attributeMap).attributeValue = e.target.value;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.change);
    changeFun(e)
  }

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
