import React, {useEffect,useState} from 'react'
import { Radio } from 'antd';
import subscribe from '../../DefineHook/subscribe';
import Store from '../../Store';
import _ from 'lodash'

export default function XinRadioGroup(props) {

  const [style,setStyle] = useState({})
  const {styleCss,disabled,visible,size,optionType,buttonStyle,actionJs,selectedID,comId } = props
  const [update,setUpdate] = useState({})
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"250px","minHeight":"40px","border":"1px solid blue","display":"flex"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })

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

  useEffect(() => {
    if(findNodeByComId(comId)){
      findNodeByComId(comId).selectedID = props?.childList?.[props?.children?.[0]?.key]?.comId;
      Store.dispatch({type: 'change',attributeMap})
    }
  },[])

  const onChange = (e) => {
    findNodeByComId(comId).selectedID = e.target.value;
    Store.dispatch({type: 'change',attributeMap})
    let script = document.createElement('script');
    script.innerHTML = actionJs?.change
    document.body.append(script)
  };


  return (
    <div style={{display: visible ? 'none':'block'}}>
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
