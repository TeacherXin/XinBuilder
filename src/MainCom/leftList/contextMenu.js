import React from 'react'
import { Button } from 'antd'
import './contextMenu.css'

export default function ContextMenu(props) {
  const {showListMenu, setShowJson} = props;
  return (
    <div style={{display: showListMenu? 'block':'none'}} className='contextMenu'>
        <Button onClick={() => {setShowJson(true)}} style={{borderRadius:'0'}} type='text' className='contextMenuItem'>查看JSON</Button>
        <Button style={{borderRadius:'0'}} type='text' className='contextMenuItem'>删除节点</Button>
    </div>
  )
}
