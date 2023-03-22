import React from 'react'
import './index.css'
import { useNavigate } from "react-router-dom"; 

export default function DesignTop() {

  const navigate  = useNavigate();

  const toMetaRender = () => {
    navigate('/metaRender')
  }

  return (
    <div className='designTop'>
      <button onClick={toMetaRender}>预览</button>
    </div>
  )
}
