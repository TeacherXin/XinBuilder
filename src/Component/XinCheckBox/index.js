import React, { useState,useEffect } from 'react'
import { Checkbox, message } from 'antd'
import Store from '../../Store';
import _ from 'lodash'

export default function XinCheckBox(props) {
  const {attributeValue,actionJs,styleCss,disabled,checked,comId,visible} = props
  //checkbox组件的样式
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  /**
   * 当styleCss变化时，更新组件的style
   * @level 3
   */
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{}';
    let style;
    try {
      style = JSON.parse(styleStr)
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
  },[styleCss])

  /**
   * checkbox的点击事件，除了触发事件，要将对应的组件状态改变
   * @param {*} e 事件对象
   * @level 3
   */
  const onChange = (e) =>{
    window.findNodeByComId(comId,attributeMap).checked = !window.findNodeByComId(comId,attributeMap)?.checked;
    Store.dispatch({type: 'change',attributeMap});
    const changeFun = new Function(actionJs?.change);
    changeFun(e);
  }

  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <Checkbox
        checked={checked}
        disabled={disabled}
        style={style}
        onChange={onChange}
      >
        {attributeValue || 'CheckBox'}
      </Checkbox>
    </div>
  )
}
