import React, { useEffect, useState } from 'react'
import './index.css'
import {Modal} from 'antd'
// 核心组件
import AceEditor from 'react-ace'
// 引入对应的语言
import 'ace-builds/src-noconflict/mode-javascript'
//以下import的是风格
import 'ace-builds/src-noconflict/theme-eclipse'
// 代码提示
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'

export default function EditAction(props) {
  const {changeActionJs,submitAction,actionJs,showAction,actionName} = props

  return (
    <Modal
      open={showAction}
      className='editStyle'
      onOk={submitAction(true)}
      width={600}
      onCancel={submitAction(false)}
      closable={false}
    >
      <AceEditor
        name='editAction'
        mode='javascript'
        theme='github'
        setOptions={{
          // 基础的自动完成
          enableBasicAutocompletion: true,
          // 实时自动完成
          enableLiveAutocompletion: true,
          // 代码块
          enableSnippets: true,
          // 显示行号
          showLineNumbers: true,
          // tab键两个空格
          tabSize: 2
        }}
        onChange={changeActionJs}
        value={actionJs?.[actionName] || ''}
      />
    </Modal>
  )
}
