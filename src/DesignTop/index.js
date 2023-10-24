import React, { useState } from 'react'
import './index.css'
import { useNavigate } from "react-router-dom";
import Store from '../Store';
import subscribeHook from '../DefineHook/subscribe';
import { Button,message,Popover } from 'antd';
import _ from 'lodash'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import {UpOutlined,DownOutlined, UndoOutlined, RedoOutlined} from '@ant-design/icons'

export default function DesignTop(props) {

  // 用于redux状态更新时，更新组件
  const [update,setUpdate] = useState({})
  // 是否展示顶部栏
  const [showTop,setShowTop] = useState(true)
  const state = useLocation().state;
  const [messageApi, contextHolder] = message.useMessage();

  subscribeHook(() => {
    setUpdate({})
  })

  const navigate  = useNavigate();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  /**
   * 跳转到运行时
   * @level 3
   */
  const toMetaRender = () => {
    navigate('/metaRender',{state: {pageId:state.pageId}});
  }

  /**
   * 保存逻辑，调用接口将json保存进数据库
   * @level 3
   */
  const savePageInfo = () => {
    axios.post(`http://${window.location.hostname}:80/pageJson/updatePage`,{
      pageId:state.pageId,
      pageJson: attributeMap
    })
    .then(res => {
      messageApi.open({
        type: 'success',
        content: '保存成功',
      });
    })
    .catch(err => {
      messageApi.open({
        type: 'error',
        content: '保存失败',
      });
    })
  }

  const redOutlined = () => {

  }

  /**
   * 撤销逻辑，在window上挂载一个stack，用于保存操作的JSON记录，点击回退的时候，往回走一个。同时更新redux
   * @level 3
   */
  const undoOutlined = () => {
    if(window.stackIndex > 1){
      const attributeStack = window.attributeStack;
      const stackIndex = window.stackIndex
      Store.dispatch({type: 'change', attributeMap: attributeStack[stackIndex - 2], lineFlag: true});
      window.stackIndex--;
    }
  }

  return (
    showTop ? <div className='designTop'>
      {contextHolder}
      <UpOutlined onClick={() => {setShowTop(false)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer',position:'absolute',left:'1000px',zIndex:'10000'}} />
      <span style={{color:'rgb(192, 190, 230)',position:'relative',left:'100px',fontSize:'28px',top:'15px',fontStyle: 'italic',fontWeight:'bold'}}>XinBuilder</span>
      <Button style={{width: 80,height:30}} type='primary' ghost onClick={savePageInfo}>保存</Button>
      <Button style={{width: 80,height:30}} type='primary' ghost onClick={toMetaRender}>预览</Button>
      <Button style={{width: 80,height:30}} type='primary' ghost onClick={() => {navigate('/')}}>返回</Button>
      <Popover content={'重做'}>
        <RedoOutlined onClick={redOutlined} className='topIcon'/>
      </Popover>
      <Popover content={'撤销'}>
        <UndoOutlined onClick={undoOutlined} className={window.stackIndex > 1 ? 'topIconActive':'topIcon'}/>
      </Popover>
      <div className='pageIdTitle'>pageID：<span style={{color:'#6c6a6a'}}>{state.pageId}</span></div>
    </div> : <DownOutlined onClick={() => {setShowTop(true)}} style={{color:'rgb(192, 190, 230)',cursor: 'pointer',position:'absolute',left:'1000px',zIndex:'10000'}} />
  )
}
