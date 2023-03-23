import React from 'react'
import './index.css'
import { useNavigate } from "react-router-dom"; 

export default function DesignTop(props) {

  const navigate  = useNavigate();
  const {atrributeMap} = props

  const toMetaRender = () => {
    navigate('/metaRender',{state: atrributeMap})
  }

  return (
    <div className='designTop'>
      <button onClick={toMetaRender}>展示</button>
    </div>
  )
}
