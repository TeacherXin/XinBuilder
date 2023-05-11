import React, { useState,useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import subscribe from '../../DefineHook/subscribe';
import _ from 'lodash'

export default function XinForm(props) {

  const [style,setStyle] = useState({})
  const {styleCss,comId,disabled,size,layout,colon,labelAlign,visible,childList } = props
  const [update,setUpdate] = useState({})

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"400px","minHeight":"200px","border":"1px solid blue"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })


  return (
    <div style={{display: visible ? 'none':'block'}}>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={style}
        disabled={disabled}
        size={size}
        layout={layout}
        colon={colon}
        labelAlign={labelAlign}
      >
          {(props?.children || []).map(item => {
            return <Form.Item
                    style={{display: childList[item.key].visible ? 'none':'block'}}
                    key={item.key}
                    label={props.childList[item.key].label}
                    name={props.childList[item.key].label}
                    rules={[{required: props.childList[item.key].required,message:props.childList[item.key].requiredMessage}]}
                >
                {item}
              </Form.Item>
          })}
      </Form>
    </div>
  )
}
