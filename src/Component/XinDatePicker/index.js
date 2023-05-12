import React, {useEffect, useState} from 'react'
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import Store from '../../Store';
import _ from 'lodash'

export default function XinDatePicker(props) {
  const [value,setValue] = useState('');
  const [style,setStyle] = useState({})
  const {styleCss,picker,showTime,comId,actionJs,attributeValue,dateFormat,disabled,size,allowClear} = props
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','');
    let style = JSON.parse(styleStr || '{}')
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
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  }


  return (
    <div>
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
