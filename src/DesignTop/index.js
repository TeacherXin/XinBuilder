import React, { useEffect, useState } from 'react'
import './index.css'
import { useNavigate } from "react-router-dom";
import Store from '../Store';
import subscribeHook from '../DefineHook/subscribe';
import { Image,Button,message } from 'antd';
import _ from 'lodash'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import {UpOutlined,DownOutlined} from '@ant-design/icons'

export default function DesignTop(props) {

  const [update,setUpdate] = useState({})
  const [showTop,setShowTop] = useState(true)
  const state = useLocation().state;
  const [messageApi, contextHolder] = message.useMessage();

  subscribeHook(() => {
    setUpdate({})
  })

  const navigate  = useNavigate();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  const toMetaRender = () => {
    navigate('/metaRender',{state: {pageId:state.pageId}});
  }

  const savePageInfo = () => {
    axios.post(`http://${window.location.hostname}:3003/pageJson/updatePage`,{
      pageId:state.pageId,
      pageJson: attributeMap
    })
    .then(res => {
      messageApi.open({
        type: 'success',
        content: '保存成功',
      });
      setTimeout(() => {
        navigate('/');
      }, 600);
    })
    .catch(err => {
      messageApi.open({
        type: 'error',
        content: '保存失败',
      });
    })
  }

  return (
    showTop ? <div className='designTop'>
      {contextHolder}
      <UpOutlined onClick={() => {setShowTop(false)}} style={{color:'blue',cursor: 'pointer',position:'absolute',left:'1000px',zIndex:'10000'}} />
      <Image
        width={30}
        height={30}
        style={{position:'relative',left:'300px'}}
        src={'https://tpc.googlesyndication.com/simgad/13961833089927279457/14763004658117789537?w=200&h=200'}
      />
      <span style={{position:'relative',left:'320px',fontSize:'24px',top:'4px',fontStyle: 'italic'}}>XinBuilder</span>
      <Button style={{width: 80,height:30}} type='primary' ghost onClick={savePageInfo}>保存</Button>
      <Button style={{width: 80,height:30}} type='primary' ghost onClick={() => {navigate('/')}}>返回</Button>
      {/* <Button style={{width: 80,height:30}} type='primary' ghost onClick={toMetaRender}>预览</Button> */}
    </div> : <DownOutlined onClick={() => {setShowTop(true)}} style={{color:'blue',cursor: 'pointer',position:'absolute',left:'1000px',zIndex:'10000'}} />
  )
}
