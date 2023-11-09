import React, {useEffect, useState} from 'react'
import { DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import Store from '../../store';
import _ from 'lodash'

export default function XinDatePicker(props) {
  // 日期框的值
  const [value,setValue] = useState('');
  // 日期框的样式
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  const {styleCss,picker,showTime,comId,actionJs,attributeValue,dateFormat,disabled,size,allowClear,visible} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  /**
   * 当styleCss改变时，更改日期框的style
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
    setStyle(style)
  },[styleCss])

  /**
   * 当通过右侧属性面板更改日期框的值时，也要更改对应的属性
   * @level 3
   */
  useEffect(() => {
    setValue(attributeValue)
  },[attributeValue])

  /**
   * 日期框更改时间的回调
   * @param {Object} data 对应的时间对象
   * @param {string} dataString 对应的时间字符串
   * @level 3
   */
  const onChange = (data,dataString) =>{
    setValue(dataString);
    window.findNodeByComId(comId,attributeMap).attributeValue = dataString;
    Store.dispatch({type: 'change',attributeMap});
    let changeFun = new Function(actionJs?.change);
    changeFun(data,dataString);
  }


  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <DatePicker
        style={style}
        picker={picker}
        showTime={showTime}
        onChange={onChange}
        value={dayjs(value || '1998/12/18', dateFormat)}
        format={dateFormat}
        disabled={disabled}
        size={size}
        allowClear={allowClear}
      />
    </div>
  )
}
