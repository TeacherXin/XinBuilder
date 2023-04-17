import React, { useEffect, useState } from 'react'
import './index.css'
import { useNavigate } from "react-router-dom";
import Store from '../Store';
import subscribeHook from '../DefineHook/subscribe';
import _ from 'lodash'

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

  return (
    <div className='designTop'>
      <button onClick={toMetaRender}>展示</button>
    </div>
  )
}
