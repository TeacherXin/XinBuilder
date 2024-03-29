import React, {useEffect,useState} from 'react'
import { Radio,message } from 'antd';
import subscribe from '../subscribe';
import Store from '../../store';
import _ from 'lodash'

export default function XinRadioGroup(props) {

  const [style,setStyle] = useState({})
  const {styleCss,disabled,visible,size,optionType,buttonStyle,actionJs,selectedID,comId } = props
  const [update,setUpdate] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"250px","minHeight":"40px","border":"1px solid blue","display":"flex"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'250px',
        minHeight:'40px',
        border:'1px solid blue',
        display:'flex'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'250px',
        minHeight:'40px',
        border:'1px solid blue',
        display:'flex'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })

  useEffect(() => {
    if(window.findNodeByComId(comId,attributeMap)){
      window.findNodeByComId(comId,attributeMap).selectedID = props?.childList?.[props?.children?.[0]?.key]?.comId;
      Store.dispatch({type: 'change',attributeMap})
    }
  },[])

  const onChange = (e) => {
    window.findNodeByComId(comId,attributeMap).selectedID = e.target.value;
    Store.dispatch({type: 'change',attributeMap})
    const changeFun = new Function(actionJs?.change);
    changeFun(e)
  };


  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
      <Radio.Group
        value={selectedID}
        style={style}
        onChange={onChange}
        disabled={disabled}
        optionType={optionType}
        buttonStyle={buttonStyle}
        size={size}
      >
        {(props?.children || []).map(item => {
          return <div key={item.key}>{item}</div>
        })}
      </Radio.Group>
    </div>
  )
}
