import {React, useState} from 'react'
import './index.css'

export default function RenderCom(props) {
  const [comList, setComList] = useState([])
  let dragCom = null;
  const {NowCom} = props


  const onDrop = (e) => {
    const style = {
      position: 'absolute',
      left: e.clientX + 'px',
      top: e.clientY + 'px',
    }
    setComList([...comList,{component: dragCom || NowCom.component, style,dragId: NowCom.name + e.clientX}])
  }

  const onDragEnter = (e) => {
    e.preventDefault()
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragStart = (e) => {
    const index = comList.findIndex(item => item.dragId === e.target.id);
    if(index > -1){
      const component = comList.splice(index,1)[0].component;
      dragCom = component;
    }
    setComList(comList)
  }

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='renderCom'>
      {comList.map(item => {
        return <div id={item.dragId} key={item.dragId} onDragStart={onDragStart} draggable style={item.style}>
          {item.component}
        </div>
      })}
    </div>
  )
}
