import React, { useState,useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import Store from '../../Store';
import subscribe from '../../DefineHook/subscribe';
import _ from 'lodash'

export default function XinForm(props) {

  const [style,setStyle] = useState({})
  const {onContextMenu,styleCss,comId} = props
  const [childList,setChildList] = useState({})
  const [update,setUpdate] = useState({})
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  useEffect(() => {
    let styleStr = styleCss?.replaceAll('\n','') || '{"minWidth":"400px","minHeight":"200px","border":"1px solid blue"}';
    let style = JSON.parse(styleStr)
    setStyle(style)
  },[styleCss])

  subscribe(() => {
    setUpdate({})
  })

  useEffect(() => {
    setChildList(attributeMap[comId].children)
  },[update])


  return (
    <div onContextMenu={onContextMenu}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={style}
      >
          {(props?.children || []).map(item => {
            return <Form.Item
                >
                {item}
              </Form.Item>
          })}
      </Form>
    </div>
  )
}
