import React, { useEffect, useState } from 'react'
import './index.css'
import { useNavigate } from "react-router-dom";
import Store from '../Store';
import subscribeHook from '../DefineHook/subscribe';
import { Image,Button } from 'antd';
import _ from 'lodash'
import axios from 'axios'

export default function DesignTop(props) {

  const [update,setUpdate] = useState({})

  subscribeHook(() => {
    setUpdate({})
  })

  const navigate  = useNavigate();
  const attributeMap = _.cloneDeep(Store.getState().attributeMap)

  const toMetaRender = () => {
    navigate('/metaRender',{state: attributeMap});
  }

  const savePageInfo = () => {
    axios.post('http://localhost:3003/pageJson/addPage',{
      pageId:'pageInfo_01',
      pageJson: attributeMap
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='designTop'>
      <Image
        width={30}
        height={30}
        style={{position:'relative',left:'300px'}}
        src={'https://tpc.googlesyndication.com/simgad/13961833089927279457/14763004658117789537?w=200&h=200'}
      />
      <span style={{position:'relative',left:'320px',fontSize:'24px',top:'4px',fontStyle: 'italic'}}>XinBuilder</span>
      <Button style={{width: 80,height:30}} type='primary' ghost onClick={savePageInfo}>保存</Button>
      {/* <Button style={{width: 80,height:30}} type='primary' ghost onClick={toMetaRender}>预览</Button> */}
    </div>
  )
}
