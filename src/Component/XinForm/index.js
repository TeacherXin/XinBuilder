import React, { useState,useEffect } from 'react'
import {Form, message } from 'antd';
import subscribe from '../subscribe';
import _ from 'lodash'

export default function XinForm(props) {

  // 表单组件的样式
  const [style,setStyle] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const {styleCss,comId,disabled,size,layout,colon,labelAlign,visible,childList } = props
  const [update,setUpdate] = useState({})

  /**
   * 给表单组件初始样式，当样式配置好后，更新Form组件的style
   */
  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"400px","minHeight":"200px","border":"1px solid blue"}';
    let style;
    try {
      style = JSON.parse(styleStr || '{}')
    } catch (error) {
      style = {
        minWidth:'400px',
        minHeight:'200px',
        border:'1px solid blue'
      };
      messageApi.open({
        type: 'warning',
        content: '请按照样式标准进行配置',
      });
    }
    if(style.toString() !== '[object Object]'){
      style = {
        minWidth:'400px',
        minHeight:'200px',
        border:'1px solid blue'
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


  return (
    <div style={{display: visible ? 'none':'block'}}>
      {contextHolder}
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
