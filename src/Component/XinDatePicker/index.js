import React, {useEffect, useState} from 'react'
import { DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import Store from '../../Store';
import _ from 'lodash'

export default function XinDatePicker(props) {
  const [value,setValue] = useState('');
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  const {styleCss,picker,showTime,comId,actionJs,attributeValue,dateFormat,disabled,size,allowClear,visible} = props
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

  useEffect(() => {
    setValue(attributeValue)
  },[attributeValue])

  const findNodeByComId = (id) => {
    for(let propName in attributeMap){
      if(propName === id){
        return attributeMap[propName];
      }
      if(attributeMap[propName].childList){
        for(let _propName in attributeMap[propName].childList){
          if(_propName === id){
            return attributeMap[propName].childList[_propName]
          }
        }
      }
    }
  }

  const onChange = (data,dataString) =>{
    setValue(dataString);
    findNodeByComId(comId).attributeValue = dataString;
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
